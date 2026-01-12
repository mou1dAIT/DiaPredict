import os
import numpy as np
import joblib
import pandas as pd 


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))


BASE_PATH = os.path.abspath(os.path.join(CURRENT_DIR, '..', '..'))

# 3. Charger les fichiers en utilisant le chemin calculé
theta_final = np.load(os.path.join(BASE_PATH, "theta_final.npy"))
best_threshold = np.load(os.path.join(BASE_PATH, "best_threshold.npy"))
scaler = joblib.load(os.path.join(BASE_PATH, "scaler.pkl"))

feature_names = [
    'gender', 'age', 'hypertension', 'heart_disease', 'bmi', 
    'HbA1c_level', 'blood_glucose_level', 'smoking_history_ever', 
    'smoking_history_former', 'smoking_history_never', 
    'smoking_history_no_info', 'smoking_history_not current'
]

default_values = {
    'gender': 0.414660,
    'hypertension': 0.074850,
    'heart_disease': 0.039420,
    'smoking_history_ever': 0.040040,
    'smoking_history_former': 0.093520,
    'smoking_history_never': 0.350950,
    'smoking_history_no_info': 0.358160,
    'smoking_history_not current': 0.064470,
}

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def predict_diabetes(user_input):
    # 1. Création de la liste des valeurs dans le bon ordre
    X_values = []
    for f in feature_names:
        if f in user_input:
            X_values.append(user_input[f])
        else:
            X_values.append(default_values.get(f, 0))
    
    # 2. Conversion en DataFrame avec les noms de colonnes pour le scaler
    # Cela règle l'erreur "UserWarning: X does not have valid feature names"
    X_df = pd.DataFrame([X_values], columns=feature_names)
    
    # 3. Normalisation
    X_scaled = scaler.transform(X_df)
    
    # 4. Ajout du biais (la colonne de 1)
    X_bias = np.c_[np.ones(X_scaled.shape[0]), X_scaled]
    
    # 5. Calcul de la probabilité et prédiction
    proba = sigmoid(X_bias.dot(theta_final))[0]
    prediction = int(proba >= best_threshold)
    
    return prediction, proba