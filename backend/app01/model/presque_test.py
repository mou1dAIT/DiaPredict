import pandas as pd 
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.impute import SimpleImputer

def data_telechargement():
    data=pd.read_csv("diabetes_prediction_dataset.csv")
    return data

def affichage_valeurs_manquantes(data):
    plt.figure(figsize=(12,5))

    
    plt.subplot(1,2,1)
    sns.heatmap(data.isnull(), cmap='viridis', cbar=False)
    plt.title("Valeurs manquantes")

    
    plt.subplot(1,2,2)
    nb_nan = data.isnull().sum().sum()
    nb_non_nan = data.size - nb_nan

    plt.bar(
        ["Valeurs manquantes", "Valeurs non manquantes"],
        [nb_nan, nb_non_nan],
        color=["salmon", "lightblue"]
    )
    plt.title("Résumé des valeurs manquantes")

    for i, v in enumerate([nb_nan, nb_non_nan]):
        plt.text(i, v + data.size * 0.02, f'{v:,}', ha='center', fontweight='bold')

    

    plt.tight_layout()
    plt.show()

    return f"Nombre total de valeurs manquantes : {nb_nan}"

def remplacer_les_NaN(df):
    
    num_cols = df.select_dtypes(include=['int64','float64']).columns
    imputer_num = SimpleImputer(strategy='median')
    df[num_cols] = imputer_num.fit_transform(df[num_cols])


    cat_cols = df.select_dtypes(include=['object']).columns
    imputer_cat = SimpleImputer(strategy='most_frequent')
    df[cat_cols] = imputer_cat.fit_transform(df[cat_cols])

    return df

def remplacer_par_des_numeros(data):

    
    data['gender'] = data['gender'].map({
        'Male': 1,
        'Female': 0,
        'Other': 2
    })

   
    data['smoking_history'] = (
        data['smoking_history']
        .str.strip()
        .str.lower()
        .replace({
            'no info': 'no_info'
        })
    )

  
    data = pd.get_dummies(
        data,
        columns=['smoking_history'],
        drop_first=True
    )

    
    for col in data.columns:
        if data[col].dtype == 'bool':
            data[col] = data[col].astype(int)

    return data


def affichage_list(data):
    return list(data.columns)


 





data=data_telechargement()
new_data=remplacer_les_NaN(data)
data_globale=remplacer_par_des_numeros(new_data)

print(affichage_valeurs_manquantes(new_data))






