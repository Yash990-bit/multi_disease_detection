from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import sys
import os
import json
from bson.objectid import ObjectId
from pymongo import MongoClient

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from utils.predictor import predict_diabetes, predict_heart_disease, predict_liver_disease

# --- MongoDB Setup ---
MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")
client = MongoClient(MONGODB_URI)
db = client["multi_disease_db"]
logs_collection = db["prediction_logs"]

# Helper to serialize MongoDB docs
def serialize_doc(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

# --- FastAPI App ---
app = FastAPI(
    title="Vitalise AI Pro API", 
    description="AI-powered medical risk analysis backend."
)

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
@app.get("/health")
def health_check():
    try:
        # Test MongoDB connection
        client.admin.command('ping')
        return {"status": "ok", "mongodb": "connected", "api": "online"}
    except Exception as e:
        return {"status": "error", "mongodb": "disconnected", "error": str(e)}

@app.get("/")
def read_root():
    return {"status": "online", "model": "Sakhi AI Pro v1.0"}

@app.post("/predict/diabetes")
@app.post("/predict/diabetes/")
def api_predict_diabetes(data: DiabetesInput):
    try:
        features = [data.pregnancies, data.glucose, data.blood_pressure, data.skin_thickness, 
                    data.insulin, data.bmi, data.pedigree_function, data.age]
        result = predict_diabetes(features)
        
        # Save to MongoDB
        log = {
            "disease_type": "Diabetes",
            "input_data": data.dict(),
            "result": result,
            "timestamp": datetime.utcnow()
        }
        logs_collection.insert_one(log)
        
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/heart")
@app.post("/predict/heart/")
def api_predict_heart(data: HeartInput):
    try:
        result = predict_heart_disease(data.dict())
        log = {
            "disease_type": "Heart",
            "input_data": data.dict(),
            "result": result,
            "timestamp": datetime.utcnow()
        }
        logs_collection.insert_one(log)
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/liver")
@app.post("/predict/liver/")
def api_predict_liver(data: LiverInput):
    try:
        features = [data.age, data.gender, data.total_bilirubin, data.direct_bilirubin,
                    data.alkaline_phosphotase, data.alamine_aminotransferase, 
                    data.aspartate_aminotransferase, data.total_protiens, data.albumin, 
                    data.albumin_and_globulin_ratio]
        result = predict_liver_disease(features)
        log = {
            "disease_type": "Liver",
            "input_data": data.dict(),
            "result": result,
            "timestamp": datetime.utcnow()
        }
        logs_collection.insert_one(log)
        return {"prediction": result, "timestamp": datetime.now()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
def get_history(limit: int = 50):
    try:
        cursor = logs_collection.find().sort("timestamp", -1).limit(limit)
        logs = [serialize_doc(doc) for doc in cursor]
        return logs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history/{log_id}")
def delete_history(log_id: str):
    try:
        result = logs_collection.delete_one({"_id": ObjectId(log_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Record not found")
        return {"message": "Record deleted successfully"}
    except Exception as e:
        print(f"ERROR: {str(e)}") # This will show in Render logs
        raise HTTPException(status_code=500, detail=f"Backend Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
