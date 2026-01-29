import streamlit as st
import sys
import os

# Add project root to path to import from backend
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.utils.predictor import predict_diabetes, predict_heart_disease, predict_liver_disease

st.set_page_config(page_title="Sakhi AI - Multi-Disease Detection", layout="wide", initial_sidebar_state="collapsed")

# Inject Tailwind CSS via CDN and custom font
st.markdown("""
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
    * { font-family: 'Inter', sans-serif !important; }
    .stApp { background-color: white; }
    /* Hide Streamlit default elements */
    header, footer { visibility: hidden; }
    .main .block-container { padding: 0 !important; max-width: 100% !important; }
</style>
""", unsafe_allow_html=True)

# Landing Page HTML with Tailwind Classes
st.markdown("""
<div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="flex items-center justify-between px-[5%] py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
        <div class="text-2xl font-bold text-[#00897b] cursor-pointer">Sakhi AI</div>
        <div class="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
            <a href="/" class="hover:text-[#00897b] transition-colors">Home</a>
            <a href="/Diabetes_Detection" class="hover:text-[#00897b] transition-colors">Predict</a>
            <a href="#" class="hover:text-[#00897b] transition-colors">About</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 class="text-6xl md:text-7xl font-extrabold text-[#0d3b36] leading-[1.1] mb-8">
            AI-Powered <br> Multi-Disease Risk Analysis
        </h1>
        <p class="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            A simple yet powerful tool to analyze health patterns. Designed for educational purposes to demonstrate how Machine Learning can assist in modern healthcare.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/Diabetes_Detection" class="bg-[#00897b] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#00695c] transition-all shadow-lg shadow-teal-100/50">
                Start Analysis
            </a>
            <a href="#" class="text-[#0d3b36] font-semibold flex items-center hover:opacity-80 transition-opacity">
                Learn more <span class="ml-1">→</span>
            </a>
        </div>
    </section>

    <!-- Features Section -->
    <section class="bg-[#f0f9f8] py-20 px-6">
        <div class="max-w-7xl mx-auto text-center">
            <p class="text-[#00897b] font-bold tracking-wider text-sm mb-4 uppercase">Advanced Technology</p>
            <h2 class="text-4xl font-bold text-[#0d3b36] mb-16">Reliable Predictions & Visual Insights</h2>
            
            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <!-- Card 1 -->
                <div class="bg-white p-8 rounded-3xl border border-teal-50 shadow-sm hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-[#00897b] rounded-xl flex items-center justify-center text-white mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-[#0d3b36] mb-3">High Accuracy Model</h3>
                    <p class="text-gray-500 leading-relaxed">
                        We leverage optimized SVM and Random Forest algorithms to ensure your health risk predictions are as reliable as possible.
                    </p>
                </div>

                <!-- Card 2 -->
                <div class="bg-white p-8 rounded-3xl border border-teal-50 shadow-sm hover:shadow-md transition-shadow">
                    <div class="w-12 h-12 bg-[#00897b] rounded-xl flex items-center justify-center text-white mb-6">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-[#0d3b36] mb-3">Visual Data Analysis</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Don't just get a result—understand it. Our interactive visualization tools help you see exactly which factors are driving the risk.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 text-center text-gray-400 text-sm">
        <p>© 2026 Sakhi AI. Educational Use Only.</p>
    </footer>
</div>
""", unsafe_allow_html=True)

# Instructions for Navigation in Cloud
st.sidebar.markdown("""
<div class="p-4 bg-teal-50 rounded-xl">
    <p class="text-teal-800 text-sm font-semibold">Quick Menu</p>
    <div class="mt-2 space-y-1">
        <a href="/Diabetes_Detection" class="block text-teal-600 hover:underline text-sm">Diabetes Prediction</a>
        <a href="/Heart_Disease_Detection" class="block text-teal-600 hover:underline text-sm">Heart Prediction</a>
        <a href="/Liver_Disease_Detection" class="block text-teal-600 hover:underline text-sm">Liver Prediction</a>
    </div>
</div>
""", unsafe_allow_html=True)
