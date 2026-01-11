import pandas as pd

data = pd.read_csv(r"C:\Users\Mouad\Desktop\Diabest\backend\app01\model\diabetes_cleaned02.csv")


other_features = [
    'gender', 'heart_disease', 'hypertension', 
    'smoking_history_no_info', 'smoking_history_ever', 
    'smoking_history_former', 'smoking_history_not current', 
    'smoking_history_never'
]


default_values = data[other_features].mean().to_dict()

print(default_values)
