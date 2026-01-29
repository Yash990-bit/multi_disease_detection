import streamlit as st
import sys
import os

# Add parent directory to path to import utils
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.predictor import predict_liver_disease

st.set_page_config(page_title="Liver Disease Detection", page_icon="🧬")

st.title("🧬 Liver Disease Detection")
st.markdown("Please enter the patient's liver function test results.")

col1, col2 = st.columns(2)

with col1:
    age = st.number_input("Age", min_value=0, step=1)
    gender = st.selectbox("Gender", ["Male", "Female"])
    tb = st.number_input("Total Bilirubin", format="%.2f")
    db = st.number_input("Direct Bilirubin", format="%.2f")
    ap = st.number_input("Alkaline Phosphotase", min_value=0)

with col2:
    aa = st.number_input("Alamine Aminotransferase", min_value=0)
    ast = st.number_input("Aspartate Aminotransferase", min_value=0)
    tp = st.number_input("Total Protiens", format="%.2f")
    alb = st.number_input("Albumin", format="%.2f")
    agr = st.number_input("Albumin and Globulin Ratio", format="%.2f")

if st.button("Run Diagnostic"):
    with st.spinner("Analyzing liver health..."):
        gender_num = 1 if gender == "Male" else 0
        user_input = [age, gender_num, tb, db, ap, aa, ast, tp, alb, agr]
        result = predict_liver_disease(user_input)
        
        if "Healthy" in result:
            st.success(f"### Result: {result}")
        else:
            st.error(f"### Result: {result}")
