from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .model.ml import predict_diabetes

@csrf_exempt # Pour autoriser les requêtes de React sans jeton CSRF classique
def predict_view(request):
    if request.method == "POST":
        try:
            # On récupère les données envoyées par Axios (React)
            data = json.loads(request.body)
            
            # Préparation des données pour ton modèle
            user_input = {
                'age': float(data.get('age')),
                'bmi': float(data.get('bmi')),
                'blood_glucose_level': float(data.get('blood_glucose_level')),
                'HbA1c_level': float(data.get('HbA1c_level'))
            }

            # Ton modèle de ML
            result, probability = predict_diabetes(user_input)

            # On renvoie la réponse en JSON
            return JsonResponse({
                "status": "success",
                "result": int(result), # 0 ou 1
                "probability": round(float(probability) * 100, 2) # en %
            })

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"status": "error", "message": "Seul le POST est autorisé"}, status=405)