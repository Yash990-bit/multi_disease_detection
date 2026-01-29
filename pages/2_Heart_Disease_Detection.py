import streamlit as st
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.predictor import predict_heart_disease

st.set_page_config(page_title="Heart Disease Detection", page_icon="❤️")

st.title("❤️ Heart Disease Detection")
st.markdown("Enter medical record details below for cardiac evaluation.")

col1, col2, col3 = st.columns(3)

with col1:
    age = st.number_input("Age", min_value=0, step=1)
    sex = st.selectbox("Sex", ["Male", "Female"])
    cp = st.selectbox("Chest Pain Type", ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"])
    trestbps = st.number_input("Resting Blood Pressure", min_value=0)

with col2:
    chol = st.number_input("Serum Cholestoral (mg/dl)", min_value=0)
    fbs = st.selectbox("Fasting Blood Sugar > 120 mg/dl", ["True", "False"])
    restecg = st.selectbox("Resting ECG Result", ["Normal", "ST-T abnormality", "LV hypertrophy"])
    thalch = st.number_input("Max Heart Rate", min_value=0)

with col3:
    exang = st.selectbox("Exercise Induced Angina", ["Yes", "No"])
    oldpeak = st.number_input("ST Depression", format="%.2f")
    slope = st.selectbox("ST Segment Slope", ["Upsloping", "Flat", "Downsloping"])
    ca = st.number_input("Number of major vessels (0-3)", min_value=0, max_value=3)

thal = st.selectbox("Thalassemia", ["Normal", "Fixed Defect", "Reversible Defect"])

if st.button("Analyze Heart Health"):
    with st.spinner("Processing results..."):
        input_dict = {
            'age': age, 'sex': 'M' if sex == "Male" else 'F', 'cp': cp[:3],
            'trestbps': trestbps, 'chol': chol, 'fbs': 't' if fbs == "True" else 'f',
            'restecg': restecg, 'thalch': thalch, 'exang': 'y' if exang == "Yes" else 'n',
            'oldpeak': oldpeak, 'slope': slope.lower(), 'ca': ca, 'thal': thal.lower()
        }
        result = predict_heart_disease(input_dict)
        
        if "Healthy" in result:
            st.success(f"### Result: {result}")
        else:
            st.error(f"### Result: {result}")
