from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from utils.predictor import predict_diabetes, predict_heart_disease, predict_liver_disease

app = FastAPI(title="Sakhi AI Prediction API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with actual allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
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
    age: int
    sex: str
    cp: str
    trestbps: float
    chol: float
    fbs: str
    restecg: str
    thalch: float
    exang: str
    oldpeak: float
    slope: str
    ca: int
    thal: str

class LiverInput(BaseModel):
    age: int
    gender: int
    total_bilirubin: float
    direct_bilirubin: float
    alkaline_phosphotase: int
    alamine_aminotransferase: int
    aspartate_aminotransferase: int
    total_protiens: float
    albumin: float
    albumin_and_globulin_ratio: float

@app.get("/")
async def root():
    return {"message": "Sakhi AI Backend is running"}

@app.post("/predict/diabetes")
async def diabetes_prediction(data: DiabetesInput):
    try:
        features = [
            data.pregnancies, data.glucose, data.blood_pressure,
            data.skin_thickness, data.insulin, data.bmi,
            data.pedigree_function, data.age
        ]
        result = predict_diabetes(features)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/heart")
async def heart_prediction(data: HeartInput):
    try:
        input_dict = data.dict()
        result = predict_heart_disease(input_dict)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/liver")
async def liver_prediction(data: LiverInput):
    try:
        features = [
            data.age, data.gender, data.total_bilirubin,
            data.direct_bilirubin, data.alkaline_phosphotase,
            data.alamine_aminotransferase, data.aspartate_aminotransferase,
            data.total_protiens, data.albumin, data.albumin_and_globulin_ratio
        ]
        result = predict_liver_disease(features)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
