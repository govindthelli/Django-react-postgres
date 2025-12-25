from django.urls import path
from .views import index

urlpatterns = [
    path("", index),         # /users/ → index view
    path("login/", index),    # /users/login/ → optional (same logic)
]
