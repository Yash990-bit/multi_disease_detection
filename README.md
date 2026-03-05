# Vitalise AI Pro - Next-Gen Healthcare Analysis

![Vitalise AI Pro Showcase](showcase.png)

Vitalise AI Pro is a sophisticated, AI-powered healthcare analysis platform designed to provide instant clinical insights. Leveraging advanced deep learning models, the application empowers both patients and medical professionals with data-driven evaluations for various health conditions.

## 🚀 Key Features

- **Multi-Disease Detection**: Specialized analysis modules for:
  - **Diabetes Risk**: Evaluation based on historical health metrics.
  - **Heart Disease**: Clinical assessment of cardiovascular health.
  - **Liver Health**: Analysis of liver function and risk factors.
- **Explainable AI**: Visual representation of prediction markers (Radar charts and importance mapping).
- **Clinical History**: Log and track previous evaluations for longitudinal health monitoring.
- **Premium UI/UX**: Modern, responsive dashboard with dark mode support and glassmorphism elements.

## 🛠️ Technology Stack

### Frontend
- **React 18**: Component-based UI development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling for a premium look.
- **Lucide React**: Beautifully crafted icons.
- **Recharts**: Data visualization and medical charts.

### Backend
- **FastAPI (Python)**: High-performance asynchronous API framework.
- **SQLAlchemy & SQLite**: Lightweight and reliable data persistence.
- **Scikit-learn**: Powering the machine learning prediction models.

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- Python (3.9+)

### 1. Clone the Repository
```bash
git clone https://github.com/Yash990-bit/multi_disease_detection.git
cd multi_disease_detection
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r ../requirements.txt
python api.py
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📄 License
This project is licensed under the MIT License.
