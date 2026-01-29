import streamlit as st
import sys
import os

# Add parent directory to path to import utils
# Add project root to path to import from backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from backend.utils.predictor import predict_heart_disease

st.set_page_config(page_title="Heart Risk Analysis", layout="wide", initial_sidebar_state="collapsed")

# Tailwind CSS Injection
st.markdown("""
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
    * { font-family: 'Inter', sans-serif !important; }
    .stApp { background-color: #f7fdfd !important; }
    header, footer { visibility: hidden; }
    .main .block-container { padding: 0 !important; }
    
    div[data-baseweb="input"], [data-baseweb="select"] {
        border-radius: 12px !important;
        border: 1px solid #e0f2f1 !important;
        background-color: white !important;
    }
    .stButton > button {
        width: 100% !important;
        background-color: #00897b !important;
        color: white !important;
        border-radius: 50px !important;
        border: none !important;
        padding: 0.75rem !important;
        font-weight: 600 !important;
        margin-top: 1rem !important;
    }
</style>

<div class="bg-white flex items-center justify-between px-[5%] py-4 border-b border-gray-100">
    <a href="/" class="text-2xl font-bold text-[#00897b] no-underline">Sakhi AI</a>
    <div class="flex space-x-6 text-sm font-medium text-gray-500">
        <a href="/" class="hover:text-[#00897b]">Home</a>
        <a href="#" class="text-[#00897b]">Predict</a>
        <a href="#" class="hover:text-[#00897b]">About</a>
    </div>
</div>

<div class="max-w-7xl mx-auto px-6 py-12 text-center">
    <h1 class="text-4xl font-extrabold text-[#0d3b36] mb-2">Heart Risk Analysis</h1>
    <p class="text-teal-600 font-medium text-sm mb-12">Enter clinical features below to analyze cardiac health metrics.</p>

    <div class="grid lg:grid-cols-2 gap-10 items-start">
        <div class="bg-white p-10 rounded-[32px] border border-teal-50 shadow-sm text-left">
            <h3 class="text-teal-700 font-bold border-b border-teal-100 pb-2 mb-8">Patient Features</h3>
            <div id="heart-form"></div>
        </div>

        <div class="bg-white p-10 rounded-[32px] border border-teal-50 shadow-sm min-h-[600px] flex flex-col items-center justify-center text-center">
             <div class="w-full max-w-[300px] aspect-square bg-[#f3faf9] rounded-full flex items-center justify-center mb-8 relative border-8 border-white shadow-inner">
                <p class="text-[#00897b] font-bold text-center px-4">Cardiac Insights <br> <span class="text-xs font-normal text-gray-400">Run diagnostic to see detailed analysis</span></p>
             </div>
             <h3 class="text-xl font-bold text-[#0d3b36] mb-2">Risk Breakdown</h3>
             <p class="text-sm text-gray-400 max-w-sm">We analyze multiple factors including cholesterol, blood pressure, and ECG results to provide a comprehensive heart health report.</p>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

with st.container():
    col_left, _ = st.columns([1, 1])
    with col_left:
        # Spacing to align with HTML cards
        for _ in range(5): st.write("")
        
        c1, c2 = st.columns(2)
        with c1:
            age = st.number_input("Age", min_value=0, step=1)
            sex = st.selectbox("Sex", ["Male", "Female"])
            cp = st.selectbox("Chest Pain Type", ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"])
            trestbps = st.number_input("Resting BP", min_value=0)
            chol = st.number_input("Cholestoral", min_value=0)
            fbs = st.selectbox("Fasting Blood Sugar > 120", ["True", "False"])
        with c2:
            restecg = st.selectbox("Resting ECG Result", ["Normal", "ST-T abnormality", "LV hypertrophy"])
            thalch = st.number_input("Max Heart Rate", min_value=0)
            exang = st.selectbox("Exercise Angina", ["Yes", "No"])
            oldpeak = st.number_input("ST Depression", format="%.2f")
            slope = st.selectbox("ST Segment Slope", ["Upsloping", "Flat", "Downsloping"])
            ca = st.number_input("Major Vessels (0-3)", min_value=0, max_value=3)
        
        thal = st.selectbox("Thalassemia", ["Normal", "Fixed Defect", "Reversible Defect"])

        if st.button("Run Diagnostic"):
            with st.spinner("Analyzing cardiac data..."):
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
