"""
SOLUTION AU PROBLÈME DE STABILITÉ

Ce script :
1. Vérifie si les fichiers du modèle existent
2. Entraîne le modèle SEULEMENT s'ils n'existent pas
3. Ajoute des vérifications de cohérence
"""

import numpy as np
import pandas as pd
import joblib
import os
from datetime import datetime
from presque_test2 import data_telechargement, splice_and_scale, preparing
import scipy.optimize as opt
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, f1_score

# ============================================================
# CONFIGURATION - CHEMINS DES FICHIERS
# ============================================================
BASE_PATH = r"C:\Users\Mouad\Desktop\Diabest"

FILES = {
    'theta': os.path.join(BASE_PATH, 'theta_final.npy'),
    'threshold': os.path.join(BASE_PATH, 'best_threshold.npy'),
    'scaler': os.path.join(BASE_PATH, 'scaler.pkl'),
    'feature_names': os.path.join(BASE_PATH, 'feature_names.npy'),
    'default_values': os.path.join(BASE_PATH, 'default_values.npy'),
    'model_info': os.path.join(BASE_PATH, 'model_info.txt')
}

# ============================================================
# FONCTION : VÉRIFIER SI LE MODÈLE EXISTE
# ============================================================
def check_model_exists():
    """Vérifie si tous les fichiers du modèle existent"""
    required_files = ['theta', 'threshold', 'scaler']
    
    all_exist = True
    print("="*70)
    print("🔍 VÉRIFICATION DES FICHIERS DU MODÈLE")
    print("="*70)
    
    for name, path in FILES.items():
        exists = os.path.exists(path)
        status = "✅" if exists else "❌"
        
        if name in required_files:
            print(f"{status} {name:20} : {path}")
            if not exists:
                all_exist = False
        
        # Afficher la date de modification si existe
        if exists:
            mod_time = datetime.fromtimestamp(os.path.getmtime(path))
            print(f"   └─ Dernière modification : {mod_time.strftime('%Y-%m-%d %H:%M:%S')}")
    
    print("="*70)
    return all_exist

# ============================================================
# FONCTION : ENTRAÎNER LE MODÈLE
# ============================================================
def train_model(force=False):
    """
    Entraîne le modèle et sauvegarde tous les fichiers
    
    Args:
        force (bool): Si True, ré-entraîne même si le modèle existe
    """
    
    # Vérifier si le modèle existe déjà
    if not force and check_model_exists():
        print("\n⚠️  Le modèle existe déjà !")
        print("Si vous voulez ré-entraîner, lancez : train_model(force=True)")
        return
    
    print("\n" + "="*70)
    print("🔄 ENTRAÎNEMENT DU MODÈLE")
    print("="*70)
    
    # Charger les données
    print("\n📂 Chargement des données...")
    data = data_telechargement()
    X_train_scaled, X_test_scaled, Y_train, Y_test = splice_and_scale(data)
    X_train, Y_train, theta = preparing(X_train_scaled, Y_train)
    X_test = np.c_[np.ones(X_test_scaled.shape[0]), X_test_scaled]
    
    print(f"✅ Données chargées : {len(Y_train)} train, {len(Y_test)} test")
    
    # Définir les fonctions
    def sigmoid(z):
        return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
    
    def log_loss(theta, X, Y, lambda_=0.1, class_weight=15):
        m = len(Y)
        h = sigmoid(X.dot(theta))
        epsilon = 1e-15
        weights = np.where(Y == 1, class_weight, 1)
        loss = (-1/m) * np.sum(weights * (Y*np.log(h+epsilon) + (1-Y)*np.log(1-h+epsilon)))
        reg = (lambda_/(2*m)) * np.sum(theta[1:]**2)
        return loss + reg
    
    def gradient(theta, X, Y, lambda_=0.1, class_weight=15):
        m = len(Y)
        h = sigmoid(X.dot(theta))
        weights = np.where(Y == 1, class_weight, 1)
        grad = (1/m) * X.T.dot(weights*(h - Y))
        grad[1:] += (lambda_/m) * theta[1:]
        return grad
    
    # Optimisation
    print("\n🔄 Optimisation en cours...")
    res = opt.minimize(
        fun=log_loss,
        x0=theta,
        args=(X_train, Y_train),
        jac=gradient,
        method='L-BFGS-B',
        options={'maxiter': 5000, 'disp': False}
    )
    
    theta_final = res.x
    print(f"✅ Optimisation terminée")
    print(f"   Coût final : {log_loss(theta_final, X_test, Y_test):.4f}")
    
    # Trouver le meilleur seuil
    print("\n🎯 Recherche du seuil optimal...")
    proba_test = sigmoid(X_test.dot(theta_final))
    fpr, tpr, thresholds = roc_curve(Y_test, proba_test)
    
    best_f1 = 0
    best_threshold = 0.5
    
    for t in thresholds:
        y_pred = (proba_test >= t).astype(int)
        recall = np.sum((y_pred == 1) & (Y_test == 1)) / np.sum(Y_test == 1)
        if recall >= 0.85:
            f1 = f1_score(Y_test, y_pred)
            if f1 > best_f1:
                best_f1 = f1
                best_threshold = t
    
    print(f"✅ Seuil optimal trouvé : {best_threshold:.4f}")
    print(f"   F1-Score : {best_f1:.4f}")
    
    # Évaluation
    y_final = (proba_test >= best_threshold).astype(int)
    cm = confusion_matrix(Y_test, y_final)
    
    print(f"\n📊 Performance du modèle :")
    print(confusion_matrix(Y_test, y_final))
    print(classification_report(Y_test, y_final))
    
    # Sauvegarder TOUS les fichiers
    print("\n💾 Sauvegarde des fichiers...")
    
    # 1. Theta et threshold
    np.save(FILES['theta'], theta_final)
    np.save(FILES['threshold'], best_threshold)
    print(f"✅ {FILES['theta']}")
    print(f"✅ {FILES['threshold']}")
    
    # 2. Feature names
    X_original = data.drop("diabetes", axis=1)
    feature_names = list(X_original.columns)
    np.save(FILES['feature_names'], np.array(feature_names))
    print(f"✅ {FILES['feature_names']}")
    
    # 3. Default values
    features_utilisateur = ['age', 'bmi', 'blood_glucose_level', 'HbA1c_level']
    default_values = {}
    for col in X_original.columns:
        if col not in features_utilisateur:
            default_values[col] = float(X_original[col].mean())
    np.save(FILES['default_values'], default_values)
    print(f"✅ {FILES['default_values']}")
    
    # 4. Scaler (déjà sauvegardé par splice_and_scale)
    print(f"✅ {FILES['scaler']} (déjà sauvegardé)")
    
    # 5. Informations du modèle
    with open(FILES['model_info'], 'w', encoding='utf-8') as f:
        f.write("="*70 + "\n")
        f.write("INFORMATIONS DU MODÈLE\n")
        f.write("="*70 + "\n\n")
        f.write(f"Date d'entraînement : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Seuil de décision : {best_threshold:.6f}\n")
        f.write(f"F1-Score : {best_f1:.6f}\n")
        f.write(f"Nombre de features : {len(feature_names)}\n")
        f.write(f"Taille de theta : {len(theta_final)}\n")
        f.write(f"Class weight : 15\n")
        f.write(f"Lambda (régularisation) : 0.1\n")
        f.write(f"\nPerformance :\n")
        f.write(f"  Matrice de confusion :\n")
        f.write(f"    {cm[0]}\n")
        f.write(f"    {cm[1]}\n")
        f.write(f"\nFeatures (ordre) :\n")
        for i, feat in enumerate(feature_names, 1):
            f.write(f"  {i:2}. {feat}\n")
    
    print(f"✅ {FILES['model_info']}")
    
    print("\n" + "="*70)
    print("✅ MODÈLE ENTRAÎNÉ ET SAUVEGARDÉ AVEC SUCCÈS")
    print("="*70)
    print("\n⚠️  IMPORTANT : Ne relancez PAS cet entraînement !")
    print("Les fichiers sont maintenant FIXES. Utilisez-les directement.\n")

# ============================================================
# FONCTION : VÉRIFIER LA COHÉRENCE
# ============================================================
def verify_model_consistency():
    """Vérifie que le modèle donne toujours les mêmes résultats"""
    
    print("\n" + "="*70)
    print("🧪 TEST DE COHÉRENCE DU MODÈLE")
    print("="*70)
    
    # Charger ml.py
    import sys
    sys.path.append(r'C:\Users\Mouad\Desktop\Diabest\backend\app01\model')
    
    try:
        from ml import predict_diabetes
    except ImportError:
        print("❌ Impossible de charger ml.py")
        return
    
    # Test case
    test_input = {
        'age': 75,
        'bmi': 35,
        'blood_glucose_level': 90,
        'HbA1c_level': 6.0
    }
    
    print(f"\n📋 Test avec : Age=75, BMI=35, Glucose=90, HbA1c=6.0")
    
    # Tester 5 fois
    results = []
    for i in range(5):
        pred, prob = predict_diabetes(test_input)
        results.append((pred, prob))
        print(f"Test {i+1} : Prédiction={pred}, Probabilité={prob*100:.6f}%")
    
    # Vérifier cohérence
    all_same = all(r == results[0] for r in results)
    
    print("\n" + "="*70)
    if all_same:
        print("✅ EXCELLENT : Le modèle est STABLE !")
        print(f"   Probabilité fixe : {results[0][1]*100:.2f}%")
    else:
        print("❌ PROBLÈME : Le modèle n'est PAS stable !")
        unique = list(set(results))
        print(f"   {len(unique)} résultats différents trouvés")
    print("="*70 + "\n")

# ============================================================
# FONCTION PRINCIPALE
# ============================================================
def main():
    """Point d'entrée principal"""
    
    print("\n" + "="*70)
    print("🎯 GESTIONNAIRE DE MODÈLE DIABÈTE")
    print("="*70)
    
    # Vérifier l'existence
    model_exists = check_model_exists()
    
    if not model_exists:
        print("\n⚠️  Le modèle n'existe pas encore.")
        response = input("\nVoulez-vous l'entraîner maintenant ? (oui/non) : ")
        
        if response.lower() in ['oui', 'o', 'yes', 'y']:
            train_model(force=True)
        else:
            print("\n❌ Entraînement annulé.")
            return
    else:
        print("\n✅ Le modèle existe déjà.")
        
        # Afficher les infos
        if os.path.exists(FILES['model_info']):
            print("\n" + "="*70)
            print("ℹ️  INFORMATIONS DU MODÈLE")
            print("="*70)
            with open(FILES['model_info'], 'r', encoding='utf-8') as f:
                print(f.read())
    
    # Test de cohérence
    verify_model_consistency()
    
    print("\n💡 RAPPEL IMPORTANT :")
    print("   • N'exécutez presque_test3.py qu'UNE SEULE FOIS")
    print("   • Utilisez ces fichiers sauvegardés en permanence")
    print("   • Si vous ré-entraînez, les probabilités changeront !\n")

if __name__ == "__main__":
    main()