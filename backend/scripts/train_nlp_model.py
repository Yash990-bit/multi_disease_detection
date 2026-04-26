import os
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import urllib.request

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")
DATASETS_DIR = os.path.join(BASE_DIR, "datasets")
os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(DATASETS_DIR, exist_ok=True)

DATASET_PATH = os.path.join(DATASETS_DIR, "Symptom2Disease.csv")
DATASET_URL = "https://raw.githubusercontent.com/mistralai/cookbook/main/data/Symptom2Disease.csv"

# 1. Load Real Dataset
print("Fetching Symptom2Disease dataset...")
if not os.path.exists(DATASET_PATH):
    urllib.request.urlretrieve(DATASET_URL, DATASET_PATH)
    print("Downloaded dataset to", DATASET_PATH)

df = pd.read_csv(DATASET_PATH)

# The dataset usually has columns 'label' and 'text'. If it's different, adjust below.
if 'label' not in df.columns or 'text' not in df.columns:
    print("Warning: Expected 'label' and 'text' columns. Found:", df.columns)
    # Some versions have 'disease' instead of 'label', and 'symptoms' instead of 'text'
    pass

# Clean text if necessary (basic lowercasing handled by TfidfVectorizer)
df['text'] = df['text'].astype(str)
df['label'] = df['label'].astype(str)

# 1.5 Augment with random general pain / questions
print("Augmenting dataset with general symptoms...")
general_data = pd.DataFrame({
    'text': [
        "I have a bad back pain", "My lower back hurts", "I pulled a muscle in my back",
        "My legs are sore", "I have muscle pain after workout", "My shoulder aches",
        "I have a mild headache", "My head hurts a little", "Just a random headache",
        "I feel completely fine", "I am healthy", "Nothing is wrong with me",
        "I have stomach ache", "My tummy hurts", "I feel bloated after eating",
        "I have knee pain", "My joints ache when it rains", "My elbow hurts",
        "Just feeling a bit tired today", "I feel lazy and fatigued",
        "Hello, how are you?", "What is this?", "Random text", "Test message"
    ],
    'label': [
        "Back Pain/Muscle Strain", "Back Pain/Muscle Strain", "Back Pain/Muscle Strain",
        "Muscle Strain", "Muscle Strain", "Muscle Strain",
        "General Headache", "General Headache", "General Headache",
        "Healthy/Normal", "Healthy/Normal", "Healthy/Normal",
        "Indigestion/Stomach Ache", "Indigestion/Stomach Ache", "Indigestion/Stomach Ache",
        "Joint Pain", "Joint Pain", "Joint Pain",
        "General Fatigue", "General Fatigue",
        "Unknown/Irrelevant", "Unknown/Irrelevant", "Unknown/Irrelevant", "Unknown/Irrelevant"
    ]
})

df = pd.concat([df, general_data], ignore_index=True)

# 2. Build and Train the NLP Pipeline
print(f"Training NLP Symptom Classifier on {len(df)} samples across {df['label'].nunique()} diseases...")
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=5000)),
    ('clf', LogisticRegression(random_state=42, class_weight='balanced', max_iter=1000))
])

pipeline.fit(df['text'], df['label'])

# 3. Save the trained model pipeline
MODEL_PATH = os.path.join(MODELS_DIR, "nlp_symptom_model.pkl")
joblib.dump(pipeline, MODEL_PATH)

print(f"Model successfully trained and saved to {MODEL_PATH}")

# Quick test
test_texts = [
    "I have pain in my chest and it hurts when I breathe",
    "I have a runny nose and a sore throat",
    "My skin is yellow and I feel very tired",
    "I have a bad headache and fever"
]
predictions = pipeline.predict(test_texts)
print("Test Predictions:")
for text, pred in zip(test_texts, predictions):
    print(f"- '{text}': {pred}")
