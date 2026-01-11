import numpy as np
import pandas as pd
from presque_test2 import data_telechargement, splice_and_scale, preparing
import scipy.optimize as opt
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, f1_score,roc_auc_score
from sklearn.metrics import roc_auc_score




data = data_telechargement()
X_train_scaled, X_test_scaled, Y_train, Y_test = splice_and_scale(data)
X_train, Y_train, theta = preparing(X_train_scaled, Y_train)

X_test = np.c_[np.ones(X_test_scaled.shape[0]), X_test_scaled]


def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def log_loss(theta, X, Y, lambda_=0.1, class_weight=5):
    m = len(Y)
    h = sigmoid(X.dot(theta))
    epsilon = 1e-15

    weights = np.where(Y == 1, class_weight, 1)
    loss = (-1/m) * np.sum(
        weights * (Y*np.log(h+epsilon) + (1-Y)*np.log(1-h+epsilon))
    )

    reg = (lambda_/(2*m)) * np.sum(theta[1:]**2)
    return loss + reg

def gradient(theta, X, Y, lambda_=0.1, class_weight=5):
    m = len(Y)
    h = sigmoid(X.dot(theta))
    weights = np.where(Y == 1, class_weight, 1)

    grad = (1/m) * X.T.dot(weights*(h - Y))
    grad[1:] += (lambda_/m) * theta[1:]
    return grad


res = opt.minimize(
    fun=log_loss,
    x0=theta,
    args=(X_train, Y_train),
    jac=gradient,
    method='L-BFGS-B',
    options={'maxiter': 5000}
)

theta_final = res.x


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


y_final = (proba_test >= best_threshold).astype(int)

print(f"Le cost : {log_loss(theta_final,X_test,Y_test):.4f}")
print("Seuil final :", best_threshold)
print(confusion_matrix(Y_test, y_final))
print(classification_report(Y_test, y_final))

auc = roc_auc_score(Y_test, proba_test)

np.save("theta_final.npy", theta_final)
np.save("best_threshold.npy", best_threshold)


