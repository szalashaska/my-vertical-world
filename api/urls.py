from django.urls import path
from . import views
from .views import MyTokenObtainPairView

# SJWT views
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/getting_started.html#installation
from rest_framework_simplejwt.views import (
    # TokenObtainPairView, -> we are useing custom view
    TokenRefreshView,
)



urlpatterns = [
    path('register', views.register, name="register"),

    path('route/image', views.route_image, name="route_image"),
    path('route/path', views.route_path, name="route_path"),
    
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
