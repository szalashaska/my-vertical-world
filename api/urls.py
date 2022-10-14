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
    path('routes-news', views.routes_news, name="routes_news"),
    path('routes/<int:route_id>', views.route, name="route"),
    path('routes/<int:route_id>/likes', views.route_likes, name="route_likes"),
    path('routes/<int:route_id>/comments', views.route_comments, name="route_comments"),

    path('walls', views.walls, name="walls"),
    path('walls/<int:wall_id>', views.wall, name="wall"),
    path('walls/<int:wall_id>/likes', views.wall_likes, name="wall_likes"),
    path('walls/<int:wall_id>/comments', views.wall_comments, name="wall_comments"),

    path('locations', views.locations, name="locations"),
    path('locations/<int:location_id>', views.location, name="location"),
    path('locations/<int:location_id>/likes', views.location_likes, name="location_likes"),
    path('locations/<int:location_id>/comments', views.location_comments, name="location_comments"),
    
    path('search', views.search, name="search"),

    path('user/<int:user_id>', views.user, name="user"),
    path('user/<int:user_id>/follows', views.user_follows, name="user_follows"),
    path('user/<int:user_id>/get-followers', views.get_followers, name="get_followers"),

    # Tokens
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
