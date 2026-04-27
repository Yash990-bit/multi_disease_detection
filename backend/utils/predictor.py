import joblib
import numpy as np
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# Global variables to cache models after they are loaded
_models = {}

def get_model(name):
    if name not in _models:
        path = os.path.join(MODELS_DIR, name)
        if os.path.exists(path):
            print(f"Loading model: {name}")
            _models[name] = joblib.load(path)
        else:
            print(f"ERROR: Model file not found: {path}")
            return None
    return _models[name]

def predict_diabetes(input_data):
    model = get_model('diabetes_model.sav')
    if not model: return "Model Error"
    input_as_numpy = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_as_numpy)
    return "Diabetic" if prediction[0] == 1 else "Not Diabetic"

def predict_heart_disease(input_dict):
    heart_data = get_model('heart_model.sav')
    if not heart_data: return "Model Error"
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
    model = get_model('liver_model.sav')
    if not model: return "Model Error"
    input_as_numpy = np.asarray(input_data).reshape(1, -1)
    prediction = model.predict(input_as_numpy)
    return "Liver Disease Detected" if prediction[0] == 1 else "Healthy Liver"
