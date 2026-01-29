import streamlit as st
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.predictor import predict_diabetes

st.set_page_config(page_title="Diabetes Detection", page_icon="🩸")

st.title("🩸 Diabetes Detection")
st.markdown("Please enter the patient's data below.")

col1, col2 = st.columns(2)

with col1:
    pregnancies = st.number_input("Number of Pregnancies", min_value=0, step=1)
    glucose = st.number_input("Glucose Level", min_value=0)
    blood_pressure = st.number_input("Blood Pressure", min_value=0)
    skin_thickness = st.number_input("Skin Thickness", min_value=0)

with col2:
    insulin = st.number_input("Insulin Level", min_value=0)
    bmi = st.number_input("BMI", format="%.2f")
    dpf = st.number_input("Diabetes Pedigree Function", format="%.3f")
    age = st.number_input("Age", min_value=0, step=1)

if st.button("Run Diagnostic"):
    with st.spinner("Analyzing data..."):
        user_input = [pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, dpf, age]
        result = predict_diabetes(user_input)
        
        if "Not Diabetic" in result:
            st.success(f"### Outcome: {result}")
            st.balloons()
        else:
            st.error(f"### Outcome: {result}")
