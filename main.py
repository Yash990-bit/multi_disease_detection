import streamlit as st

st.set_page_config(
    page_title="Multi-Disease Detection System",
    layout="wide",
    page_icon="🏥"
)

st.title("Welcome to the Multi-Disease Detection System")
st.markdown("""
### Modern Healthcare at your fingertips.
This application uses advanced Machine Learning models to help detect various health conditions based on medical data.

**Select a service from the sidebar to get started:**
1.  **Diabetes Detection**: Predict based on pregnancies, glucose, BMI, etc.
2.  **Heart Disease Detection**: Comprehensive analysis of cardiac metrics.
3.  **Liver Disease Detection**: Evaluation of liver function tests.

---
> [!NOTE]
> This tool is for educational purposes and should not replace professional medical advice.
""")

st.image("https://images.unsplash.com/photo-1576091160550-217359f49f4c?auto=format&fit=crop&q=80&w=2070", caption="Empowering Health through Data")
