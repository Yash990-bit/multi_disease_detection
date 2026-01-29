import streamlit as st
import sys
import os


st.set_page_config(page_title="Multi-Disease Detection System", layout="wide", page_icon="🏥")

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from utils.predictor import predict_diabetes, predict_heart_disease, predict_liver_disease

with st.sidebar:
    st.title("Navigation")
    selected_disease = st.radio(
        "Choose a Disease to Detect",
        ["Diabetes Detection", "Heart Disease Detection", "Liver Disease Detection"]
    )

if selected_disease == "Diabetes Detection":
    st.title("Diabetes Detection System")
    st.markdown("Please fill in the health metrics below to check for Diabetes.")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        pregnancies = st.number_input("Number of Pregnancies", min_value=0, step=1)
        blood_pressure = st.number_input("Blood Pressure value", min_value=0)
        insulin = st.number_input("Insulin Level", min_value=0)
        
    with col2:
        glucose = st.number_input("Glucose Level", min_value=0)
        skin_thickness = st.number_input("Skin Thickness value", min_value=0)
        bmi = st.number_input("BMI value", format="%.2f")
        
    with col3:
        dpf = st.number_input("Diabetes Pedigree Function value", format="%.3f")
        age = st.number_input("Age", min_value=0, step=1)

    if st.button("Predict Diabetes Status"):
        user_input = [pregnancies, glucose, blood_pressure, skin_thickness, insulin, bmi, dpf, age]
        result = predict_diabetes(user_input)
        
        if "Not Diabetic" in result:
            st.success(f"Result: {result}")
        else:
            st.error(f"Result: {result}")

elif selected_disease == "Heart Disease Detection":
    st.title("Heart Disease Detection System")
    st.markdown("Please fill in the health metrics below to check for Heart Disease.")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        age_h = st.number_input("Age", min_value=0, step=1, key='age_h')
        sex_h = st.selectbox("Sex", ["Male", "Female"])
        cp_h = st.selectbox("Chest Pain Type", ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"])
        trestbps = st.number_input("Resting Blood Pressure", min_value=0)
        
    with col2:
        chol = st.number_input("Serum Cholestoral in mg/dl", min_value=0)
        fbs = st.selectbox("Fasting Blood Sugar > 120 mg/dl", ["True", "False"])
        restecg = st.selectbox("Resting Electrocardiographic results", ["Normal", "ST-T wave abnormality", "Left ventricular hypertrophy"])
        thalch = st.number_input("Maximum Heart Rate achieved", min_value=0)
        
    with col3:
        exang = st.selectbox("Exercise Induced Angina", ["Yes", "No"])
        oldpeak = st.number_input("ST depression induced by exercise", format="%.2f")
        slope = st.selectbox("Slope of the peak exercise ST segment", ["Upsloping", "Flat", "Downsloping"])
        ca = st.number_input("Number of major vessels (0-3)", min_value=0, max_value=3)
        thal = st.selectbox("Thal", ["Normal", "Fixed Defect", "Reversible Defect"])

    if st.button("Predict Heart Status"):
        input_dict = {
            'age': age_h,
            'sex': 'M' if sex_h == "Male" else 'F',
            'cp': cp_h[:3],
            'trestbps': trestbps,
            'chol': chol,
            'fbs': 't' if fbs == "True" else 'f',
            'restecg': restecg,
            'thalch': thalch,
            'exang': 'y' if exang == "Yes" else 'n',
            'oldpeak': oldpeak,
            'slope': slope.lower(),
            'ca': ca,
            'thal': thal.lower()
        }
        result = predict_heart_disease(input_dict)
        if "Healthy" in result:
            st.success(f"Result: {result}")
        else:
            st.error(f"Result: {result}")

elif selected_disease == "Liver Disease Detection":
    st.title("Liver Disease Detection System")
    st.markdown("Please fill in the health metrics below to check for Liver Disease.")
    
    col1, col2 = st.columns(2)
    
    with col1:
        age_l = st.number_input("Age", min_value=0, step=1, key='age_l')
        gender_l = st.selectbox("Gender", ["Male", "Female"])
        tb = st.number_input("Total Bilirubin", format="%.2f")
        db = st.number_input("Direct Bilirubin", format="%.2f")
        ap = st.number_input("Alkaline Phosphotase", min_value=0)
        
    with col2:
        aa = st.number_input("Alamine Aminotransferase", min_value=0)
        ast_l = st.number_input("Aspartate Aminotransferase", min_value=0)
        tp = st.number_input("Total Protiens", format="%.2f")
        alb = st.number_input("Albumin", format="%.2f")
        agr = st.number_input("Albumin and Globulin Ratio", format="%.2f")

    if st.button("Predict Liver Status"):
        gender_num = 1 if gender_l == "Male" else 0
        user_input = [age_l, gender_num, tb, db, ap, aa, ast_l, tp, alb, agr]
        result = predict_liver_disease(user_input)
        if "Healthy" in result:
            st.success(f"Result: {result}")
        else:
            st.error(f"Result: {result}")
