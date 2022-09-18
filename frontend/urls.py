from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('sign-up', views.index),
    path('register', views.index),
    path('add-route', views.index),

    path('routes/<int:routeId>', views.index),
    path('routes/<int:routeId>/edit', views.index),

    path('locations/<int:locationId>', views.index),
    path('locations/<int:locationId>/edit', views.index),

    path('walls/<int:wallId>', views.index),
    path('walls/<int:wallId>/edit', views.index),
    
    path('user/<int:userId>', views.index),
]
