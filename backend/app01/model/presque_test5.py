import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from presque_test3 import res
from presque_test2 import data_telechargement,separation


def features_important_from_theta(theta, feature_names):

    coef = theta[1:] 

    importance = pd.Series(
        np.abs(coef),
        index=feature_names
    )

    importance = importance.sort_values(ascending=False)
    return importance


def affichage():
    data = data_telechargement()
    X, Y = separation(data)


    theta_final = res.x

   
    importance = features_important_from_theta(
        theta_final,
        X.columns
    )

    importance.plot(kind="barh", figsize=(8,6))
    plt.title("Feature importance (Custom Logistic Regression)")
    plt.tight_layout()
    plt.show()

print(affichage())