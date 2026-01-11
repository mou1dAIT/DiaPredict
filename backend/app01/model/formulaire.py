from django import forms

class DiabetesForm(forms.Form):
    age = forms.FloatField()
    bmi = forms.FloatField()
    blood_glucose_level = forms.FloatField()
    HbA1c_level = forms.FloatField()
