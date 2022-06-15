from django.shortcuts import render
from django.http import HttpResponse
from django.db import IntegrityError
# from django.contrib.auth import authenticate, login, logout

# from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User

# Customizing Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    confirm_password = request.data.get("confirm_password")

    # Ensure password matches confirmation
    if password != confirm_password:
        return Response({"message": "Passwords must match."}, status=status.HTTP_403_FORBIDDEN)

    print(username, password)

    # Attempt to register user  Hint: create_user(username, email, password)
    try:
        new_user = User.objects.create_user(username, "", password)
        new_user.save()
    except IntegrityError:
        return Response({"message": "Username already taken."}, status=status.HTTP_409_CONFLICT)   


    return Response({'message': 'Success.'}, status=status.HTTP_200_OK)
        