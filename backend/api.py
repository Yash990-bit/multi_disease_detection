from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from utils.predictor import predict_diabetes, predict_heart_disease, predict_liver_disease

# --- Database Setup ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'predictions.db')}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class PredictionLog(Base):
    __tablename__ = "prediction_logs"
    id = Column(Integer, primary_key=True, index=True)
    disease_type = Column(String)
    input_data = Column(String) # JSON string of inputs
    result = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- FastAPI App ---
app = FastAPI(title="Vitalise AI Pro API", description="AI-powered medical risk analysis backend.")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class DiabetesInput(BaseModel):
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    pedigree_function: float
    age: int

class HeartInput(BaseModel):
    age: int; sex: str; cp: str; trestbps: float; chol: float
    fbs: str; restecg: str; thalch: float; exang: str; oldpeak: float
    slope: str; ca: int; thal: str

class LiverInput(BaseModel):
    age: int; gender: int; total_bilirubin: float; direct_bilirubin: float
    alkaline_phosphotase: int; alamine_aminotransferase: int; aspartate_aminotransferase: int
    total_protiens: float; albumin: float; albumin_and_globulin_ratio: float

# --- Endpoints ---
@app.get("/")
def read_root():
    return {"status": "online", "model": "Sakhi AI Pro v1.0"}

@app.post("/predict/diabetes")
def api_predict_diabetes(data: DiabetesInput, db: Session = Depends(get_db)):
    try:
        features = [data.pregnancies, data.glucose, data.blood_pressure, data.skin_thickness, 
                    data.insulin, data.bmi, data.pedigree_function, data.age]
        result = predict_diabetes(features)
        
        # Save to DB
        log = PredictionLog(disease_type="Diabetes", input_data=str(data.dict()), result=result)
        db.add(log); db.commit()
        
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/heart")
def api_predict_heart(data: HeartInput, db: Session = Depends(get_db)):
    try:
        result = predict_heart_disease(data.dict())
        log = PredictionLog(disease_type="Heart", input_data=str(data.dict()), result=result)
        db.add(log); db.commit()
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/liver")
def api_predict_liver(data: LiverInput, db: Session = Depends(get_db)):
    try:
        features = [data.age, data.gender, data.total_bilirubin, data.direct_bilirubin,
                    data.alkaline_phosphotase, data.alamine_aminotransferase, 
                    data.aspartate_aminotransferase, data.total_protiens, data.albumin, 
                    data.albumin_and_globulin_ratio]
        result = predict_liver_disease(features)
        log = PredictionLog(disease_type="Liver", input_data=str(data.dict()), result=result)
        db.add(log); db.commit()
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
def get_history(limit: int = 10, db: Session = Depends(get_db)):
    logs = db.query(PredictionLog).order_by(PredictionLog.id.desc()).limit(limit).all()
    return logs

@app.delete("/history/{log_id}")
def delete_history(log_id: int, db: Session = Depends(get_db)):
    log = db.query(PredictionLog).filter(PredictionLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(log)
    db.commit()
    return {"message": "Record deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
