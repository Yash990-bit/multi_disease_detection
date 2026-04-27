import joblib
import numpy as np
import pandas as pd
import os

# Use absolute paths for the cloud
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(os.path.dirname(CURRENT_DIR), 'models')

# Helper to load models safely
def load_model(name):
    path = os.path.join(MODELS_DIR, name)
    if os.path.exists(path):
        return joblib.load(path)
    return None

diabetes_model = load_model('diabetes_model.sav')
heart_data = load_model('heart_model.sav')
liver_model = load_model('liver_model.sav')
nlp_model = load_model('nlp_symptom_model.pkl')
def predict_diabetes(input_data):
    """
    input_data: list of 8 features
    """
    input_as_numpy = np.asarray(input_data).reshape(1, -1)
    prediction = diabetes_model.predict(input_as_numpy)
    return "Diabetic" if prediction[0] == 1 else "Not Diabetic"

def predict_heart_disease(input_dict):
    """
    input_dict: dictionary of raw inputs (Age, Sex, CP type, etc.)
    We need to handle the same one-hot encoding as we did in training.
    """
    model = heart_data['model']
    expected_features = heart_data['features']
    
    df = pd.DataFrame([input_dict])
    
    df_encoded = pd.get_dummies(df)
    
    for col in expected_features:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
            
    df_encoded = df_encoded[expected_features]
    
    prediction = model.predict(df_encoded)
    return "Heart Disease Detected" if prediction[0] == 1 else "Healthy Heart"

def predict_liver_disease(input_data):
    """
    input_data: list of 10 features
    """
    input_as_numpy = np.asarray(input_data).reshape(1, -1)
    prediction = liver_model.predict(input_as_numpy)
    return "Liver Disease Detected" if prediction[0] == 1 else "Healthy Liver"

def predict_symptoms(text: str):
    """
    text: raw patient symptom description
    """
    if not nlp_model:
        raise Exception("NLP Symptom model not found.")
    
    prediction = nlp_model.predict([text])[0]
    probs = nlp_model.predict_proba([text])[0]
    classes = nlp_model.classes_
    
    top_3_idx = np.argsort(probs)[-3:][::-1]
    top_3_predictions = [{"disease": classes[i], "confidence": round(float(probs[i]) * 100, 2)} for i in top_3_idx]
    
    return {
        "primary_prediction": str(prediction),
        "top_predictions": top_3_predictions
    }
