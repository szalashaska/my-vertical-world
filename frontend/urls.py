from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('sign-up', views.index),
    path('register', views.index),
    path('add-route', views.index),
]
