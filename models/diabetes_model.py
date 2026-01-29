import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import joblib
import os

dataset = pd.read_csv('datasets/diabetes.csv')

zero_columns = ['Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI']

for col in zero_columns:
    dataset[col] = dataset[col].replace(0, np.nan)
    dataset[col] = dataset[col].fillna(dataset[col].median())

X = dataset.drop(columns='Outcome', axis=1)
Y = dataset['Outcome']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)

classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, Y_train)

X_train_prediction = classifier.predict(X_train)
training_data_accuracy = accuracy_score(X_train_prediction, Y_train)
print(f'Accuracy on training data: {training_data_accuracy:.4f}')

X_test_prediction = classifier.predict(X_test)
test_data_accuracy = accuracy_score(X_test_prediction, Y_test)
print(f'Accuracy on test data: {test_data_accuracy:.4f}')

model_path = 'models/diabetes_model.sav'
joblib.dump(classifier, model_path)
print(f'Model saved to {model_path}')
