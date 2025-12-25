from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json

User = get_user_model()  # ✅ Import user model properly

@csrf_exempt
def index(request):
    user = authenticate(request)

    # ❌ You previously used user.id before checking user, that causes the error
    if not user:
        return JsonResponse({'success': False, 'message': 'User not authenticated'}, status=401)

    # ✅ Safe access after user is confirmed
    data = serializers.serialize('json', [User.objects.get(id=user.id)], ensure_ascii=False)[1:-1]

    return JsonResponse({'success': True, 'data': json.loads(data)}, status=200)
