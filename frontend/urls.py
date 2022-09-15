from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('sign-up', views.index),
    path('register', views.index),
    path('add-route', views.index),
    path('route/<int:routeId>', views.index),
    path('location/<int:locationId>', views.index),
    path('wall/<int:wallId>', views.index),
    path('user/<int:userId>', views.index),
]
