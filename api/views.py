from importlib.resources import path
from pydoc import describe
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db import IntegrityError
# from django.contrib.auth import authenticate, login, logout

# from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Follow, Location, Wall, Route, Comment
from .serilizers import RouteSerializer, LocationSerializer, WallSerializer

import json

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
      

@api_view(['POST', 'GET'])
# @permission_classes([IsAuthenticated])
def routes(request):
    if request.method == "POST":
        location_name = request.data.get("location_name")
        wall_name = request.data.get("wall_name")
        wall_image = request.data.get("wall_image")
        route_name = request.data.get("route_name")
        route_path = request.data.get("route_path")
        route_grade = request.data.get("route_grade")
        route_description = request.data.get("route_description")

        # Store all names in lowercase, remove whitespace
        location_name = location_name.lower().strip()
        wall_name = wall_name.lower().strip()
        route_name = route_name.lower().strip()

        # return Response(status=status.HTTP_200_OK)
  
        if (location_name == None or wall_name == None or wall_image == None or 
        route_name == None or route_path == None or route_grade == None or 
        route_description == None):
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
            wall.image = wall_image
            wall.save()

        try:
            Location.objects.get(walls=wall)
        except Location.DoesNotExist:
            wall.location = location
            wall.save()

        # Create route
        Route.objects.create(author=author, name=route_name, path=json.loads(route_path), location=location, wall=wall, grade=route_grade, description=route_description)

        return Response({"msg": "Successfully created new route"}, status=status.HTTP_201_CREATED)

    if request.method == "GET":
        routes = Route.objects.all().order_by("-created")
        data = RouteSerializer(routes, many=True).data
     
        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)
    

@api_view(['GET'])
def walls(request):
    if request.method == "GET":
        queryset = Wall.objects.all().order_by("name")

        location_id = request.query_params.get("location_id")
        if location_id:
            queryset = queryset.filter(location__pk=location_id)

        # location_name = request.query_params.get("location_name")
        # if location_name:
        #     queryset = queryset.filter(location__name=location_name)

        data = WallSerializer(queryset, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def locations(request):
    if request.method == "GET":
        locations = Location.objects.all().order_by("name")
        data = LocationSerializer(locations, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def location(request, location_id):
    if request.method == "GET":
        try:
            location = Location.objects.get(pk=location_id)
        except Location.DoesNotExist:
            return JsonResponse({"error": "Location not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)
        
        data = LocationSerializer(location, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)