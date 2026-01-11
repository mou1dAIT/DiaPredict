import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
import os


def data_telechargement():
    data = pd.read_csv(r"C:\Users\Mouad\Desktop\Diabest\backend\app01\model\diabetes_cleaned02.csv")

    return data




def separation(data):
    X = data.drop("diabetes", axis=1)  
    Y = data["diabetes"]

    X1=data.drop(["diabetes", "smoking_history_ever", "smoking_history_former",
     "smoking_history_not current", "smoking_history_never"],axis=1)

    
    return X, Y


def splice_and_scale(data):
    X, Y = separation(data)

    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y,
        test_size=0.2,
        random_state=42,
        stratify=Y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    path_scaler = r"C:\Users\Mouad\Desktop\Diabest\scaler.pkl"
    joblib.dump(scaler, path_scaler)


    return X_train_scaled, X_test_scaled, Y_train, Y_test


def preparing(X_train_scaled, Y_train):
    X_array = np.array(X_train_scaled)
    Y_array = np.array(Y_train)
    
    
    X_array = np.c_[np.ones(X_array.shape[0]), X_array]
    
    
    theta = np.zeros(X_array.shape[1])
    
   
    return X_array, Y_array, theta

def affichage_list(data):
    return list(data.columns)


data=data_telechargement()
print(affichage_list(data))