import streamlit as st
import sys
import os

# Add parent directory to path to import utils
# Add project root to path to import from backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from backend.utils.predictor import predict_diabetes

st.set_page_config(page_title="Diabetes Risk Analysis", layout="wide", initial_sidebar_state="collapsed")

# Tailwind CSS Injection
st.markdown("""
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
    * { font-family: 'Inter', sans-serif !important; }
    .stApp { background-color: #f7fdfd !important; }
    header, footer { visibility: hidden; }
    .main .block-container { padding: 0 !important; }
    
    /* Input field styling */
    div[data-baseweb="input"] {
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
    <h1 class="text-4xl font-extrabold text-[#0d3b36] mb-2">Diabetes Risk Analysis</h1>
    <p class="text-teal-600 font-medium text-sm mb-12">Enter clinical features below to analyze risk probability.</p>

    <div class="grid lg:grid-cols-2 gap-10 items-start">
        <!-- Form Section -->
        <div class="bg-white p-10 rounded-[32px] border border-teal-50 shadow-sm text-left">
            <h3 class="text-teal-700 font-bold border-b border-teal-100 pb-2 mb-8">Patient Features</h3>
            
            <div id="prediction-form">
                <!-- Form handled by Streamlit below -->
            </div>
        </div>

        <!-- Info/Viz Section -->
        <div class="bg-white p-10 rounded-[32px] border border-teal-50 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
             <div class="w-full max-w-[300px] aspect-square bg-[#f3faf9] rounded-full flex items-center justify-center mb-8 relative border-8 border-white shadow-inner">
                <p class="text-[#00897b] font-bold text-center px-4">Result Analysis <br> <span class="text-xs font-normal text-gray-400">Run diagnostic to see insights</span></p>
             </div>
             <h3 class="text-xl font-bold text-[#0d3b36] mb-2">Feature Importance</h3>
             <p class="text-sm text-gray-400 max-w-sm">Once the diagnostic is run, we will highlight which factors contributed most to the outcome.</p>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

with st.container():
    col_left, _ = st.columns([1, 1])
    with col_left:
        st.write("")
        st.write("")
        st.write("")
        st.write("")
        
        c1, c2 = st.columns(2)
        with c1:
            preg = st.number_input("Pregnancies", min_value=0, step=1)
            glucose = st.number_input("Glucose", min_value=0)
            bp = st.number_input("Blood Pressure", min_value=0)
            stk = st.number_input("Skin Thickness", min_value=0)
        with c2:
            ins = st.number_input("Insulin", min_value=0)
            bmi = st.number_input("BMI", format="%.2f")
            dpf = st.number_input("Pedigree Func", format="%.3f")
            age = st.number_input("Age", min_value=0, step=1)
        
        if st.button("Run Diagnostic"):
            input_data = [preg, glucose, bp, stk, ins, bmi, dpf, age]
            result = predict_diabetes(input_data)
            
            if "Not Diabetic" in result:
                st.success(f"**Outcome: {result}**")
            else:
                st.error(f"**Outcome: {result}**")
