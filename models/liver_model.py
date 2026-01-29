import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

dataset = pd.read_csv('datasets/liver.csv')

dataset['Albumin_and_Globulin_Ratio'] = dataset['Albumin_and_Globulin_Ratio'].fillna(dataset['Albumin_and_Globulin_Ratio'].median())

dataset['Gender'] = dataset['Gender'].map({'Male': 1, 'Female': 0})

dataset['Dataset'] = dataset['Dataset'].map({1: 1, 2: 0})

X = dataset.drop(columns='Dataset', axis=1)
Y = dataset['Dataset']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, Y_train)

train_acc = accuracy_score(Y_train, model.predict(X_train))
test_acc = accuracy_score(Y_test, model.predict(X_test))

print(f"Training Accuracy: {train_acc:.4f}")
print(f"Test Accuracy: {test_acc:.4f}")

joblib.dump(model, 'models/liver_model.sav')
print("Model saved to models/liver_model.sav")
