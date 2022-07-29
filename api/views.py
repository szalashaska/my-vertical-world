from importlib.resources import path
from pydoc import describe
from django.shortcuts import render
from django.http import HttpResponse
from django.db import IntegrityError
# from django.contrib.auth import authenticate, login, logout

# from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Follow, Location, Wall, Route, Comment


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
def route_path(request):
    if request.method == "POST":

        path = request.data.get("path")
        if path is not None:
            new_path = Route.objects.create(path=path)
            return Response({'msg': 'Successfully uploaded route path.', 'path': new_path.path}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def routes(request):
    if request.method == "POST":
        location_name = request.data.get("location_name")
        wall_name = request.data.get("wall_name")
        route_name = request.data.get("route_name")
        route_path = request.data.get("route_path")
        route_grade = request.data.get("route_grade")
        route_description = request.data.get("route_description")

        print(request.user)
          
        if location_name == None or wall_name == None or route_name == None or route_path == None or route_grade == None or route_description == None:
            return Response({"msg": "Provided data was incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get users object
        try:
            author = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response({"msg": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

        # Create location or take existing one
        try:
            location = Location.objects.get(name=location_name)
        except Location.DoesNotExist:
            location = Location.objects.create(name=location_name)

        # Create wall or take existing one
        try:
            wall = Wall.objects.get(name=wall_name)
        except Wall.DoesNotExist:
            wall = Wall.objects.create(name=wall_name) 

        try:
            Location.objects.get(walls=wall)
        except Location.DoesNotExist:
            wall.location = location
            wall.save()

        # Create route
        Route.objects.create(author=author, name=route_name, path=route_path, location=location, wall=wall, grade=route_grade, description=route_description)

        return Response({"msg": "Successfully created new route", "wall_id": wall.id}, status=status.HTTP_201_CREATED)
     

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def route_image(request):
    if request.method == "POST":
      
        image = request.data["image"]
        Route.objects.create(image=image)
        # return Response({'msg': 'Successfully uploaded route image.'}, status=status.HTTP_201_CREATED)
        new_image = Route.objects.create(image=image)
        return Response({'msg': 'Success.', "width": new_image.image.width, "height": new_image.image.height, "url": str(new_image.image)}, status=status.HTTP_201_CREATED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)