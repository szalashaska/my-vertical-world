from importlib.resources import path
from django.shortcuts import render
from django.http import HttpResponse
from django.db import IntegrityError
# from django.contrib.auth import authenticate, login, logout

# from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Route


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
        return Response({"msg": "Passwords must match."}, status=status.HTTP_403_FORBIDDEN)

     # Attempt to register user  Hint: create_user(username, email, password)
    try:
        new_user = User.objects.create_user(username, "", password)
        new_user.save()
    except IntegrityError:
        return Response({"msg": "Username already taken."}, status=status.HTTP_409_CONFLICT)   


    return Response({'msg': 'Successfully registered user.'}, status=status.HTTP_201_CREATED)
        

@api_view(['POST'])
def route_image(request):
    if request.method == "POST":
      
        image = request.data["image"]
        Route.objects.create(image=image)
        # return Response({'msg': 'Successfully uploaded route image.'}, status=status.HTTP_201_CREATED)
        new_image = Route.objects.create(image=image)
        return Response({'msg': 'Success.', "width": new_image.image.width, "height": new_image.image.height, "url": str(new_image.image)}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def route_path(request):
    if request.method == "POST":

        path = request.data.get("path")
        if path is not None:
            new_path = Route.objects.create(path=path)
            return Response({'msg': 'Successfully uploaded route path.', 'path': new_path.path}, status=status.HTTP_201_CREATED)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)