from __future__ import unicode_literals
from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

@csrf_exempt
def index(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required"}, status=405)

    try:
        body = json.loads(request.body.decode("utf-8"))
    except:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return JsonResponse({"error": "Email and password required"}, status=400)

    # Authenticate user properly with credentials from JSON
    user = authenticate(username=email, password=password)

    if not user:
        return JsonResponse({"success": False, "message": "Invalid credentials"}, status=401)

    data = {
        "id": user.id,
        "email": user.email,
        "username": user.username
    }

    return JsonResponse({"success": True, "data": data}, status=200)
