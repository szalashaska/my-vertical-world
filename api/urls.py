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

    # API
    path('routes', views.routes, name="routes"),
    path('routes/<int:route_id>', views.route, name="route"),
    path('routes/<int:route_id>/likes', views.route_likes, name="route_likes"),

    path('walls', views.walls, name="walls"),
    path('walls/<int:wall_id>', views.wall, name="walls"),

    path('locations', views.locations, name="locations"),
    path('locations/<int:location_id>', views.location, name="location"),
    
    # Tokens
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
