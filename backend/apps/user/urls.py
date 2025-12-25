from django.urls import path
from .views.login import login   # import the login function

urlpatterns = [
    path("", login),        # /users/
    path("login/", login),  # /users/login/
]
