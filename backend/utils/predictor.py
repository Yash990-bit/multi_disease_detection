import joblib
import numpy as np
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

diabetes_model = joblib.load(os.path.join(MODELS_DIR, 'diabetes_model.sav'))
heart_data = joblib.load(os.path.join(MODELS_DIR, 'heart_model.sav')) 
liver_model = joblib.load(os.path.join(MODELS_DIR, 'liver_model.sav'))

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
