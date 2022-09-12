from importlib.resources import path
from pickle import FALSE
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
from .serilizers import GetRouteSerializer, PostLocationSerializer, PostWallSerializer, GetWallSerializer

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
        return Response({"error": "Passwords must match."}, status=status.HTTP_403_FORBIDDEN)

     # Attempt to register user  Hint: create_user(username, email, password)
    try:
        new_user = User.objects.create_user(username, "", password)
        new_user.save()
    except IntegrityError:
        return Response({"error": "Username already taken."}, status=status.HTTP_409_CONFLICT)   


    return Response({'success': 'Successfully registered user.'}, status=status.HTTP_201_CREATED)
      

@api_view(['POST', 'GET'])
# @permission_classes([IsAuthenticated])
def routes(request):
    if request.method == "POST":
        location_name = request.data.get("location_name")
        location_coordinates = request.data.get("location_coordinates")
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
  
        if (location_name == None or location_coordinates == None or wall_name == None or wall_image == None or 
        route_name == None or route_path == None or route_grade == None or 
        route_description == None):
            return Response({"error": "Provided data was incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get users object
        try:
            author = User.objects.get(pk=request.user.id)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)


        # Create location or take existing one
        try:
            location = Location.objects.get(name=location_name)
        except Location.DoesNotExist:
            location = Location.objects.create(name=location_name, coordinates=json.loads(location_coordinates))

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

        return Response({"success": "Successfully created new route"}, status=status.HTTP_201_CREATED)

    if request.method == "GET":
        routes = Route.objects.all().order_by("-created")
        data = GetRouteSerializer(routes, many=True).data
     
        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def route(request, route_id):
    if request.method == "GET":
        try:
            route = Route.objects.get(pk=route_id)
        except Route.DoesNotExist:
            return JsonResponse({"error": "Route not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)
        
        data = GetRouteSerializer(route).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


def content_likes(model, request, id):
    queryset = model.objects.filter(pk=id, liked_by__pk=request.user.id).first()
    if request.method == "GET":
        # Check if user likes content
        if queryset:
            return JsonResponse({"is_liked": True}, status=status.HTTP_200_OK, safe=False)

        return JsonResponse({"is_liked": False}, status=status.HTTP_200_OK, safe=False)

    if request.method == "PUT":
        action = request.data.get("action")
        if action == None:
            return JsonResponse({"error": "Missing 'action' param."}, status=status.HTTP_400_BAD_REQUEST, safe=False)
        
        # Like post
        if action == "like" and queryset == None:
            try:
                content = model.objects.get(pk=id)
                content.liked_by.add(request.user)
                content.likes += 1
                content.save()
            except model.DoesNotExist:
                return JsonResponse({"error": "Content ceased to exist while adding like."}, status=status.HTTP_404_NOT_FOUND, safe=False)

            return JsonResponse({"success": "Liked content.", "likes": content.likes, "is_liked": True}, status=status.HTTP_200_OK, safe=False)

        # Unlike post
        if action == "unlike" and queryset:
            queryset.liked_by.remove(request.user)
            queryset.likes -= 1
            queryset.save()     

            return JsonResponse({"success": "Unliked content.", "likes": queryset.likes, "is_liked": False}, status=status.HTTP_200_OK, safe=False)


@api_view(['GET', "PUT"])
@permission_classes([IsAuthenticated])
def route_likes(request, route_id):
    return content_likes(Route, request, route_id)



# @api_view(['GET', "PUT"])
# def route_likes(request, route_id):
#     queryset = Route.objects.filter(pk=route_id, liked_by__pk=request.user.id).first()
#     if request.method == "GET":
#         # Check if user likes content
#         if queryset:
#             return JsonResponse({"is_liked": True}, status=status.HTTP_200_OK, safe=False)

#         return JsonResponse({"is_liked": False}, status=status.HTTP_200_OK, safe=False)

#     if request.method == "PUT":
#         action = request.data.get("action")
#         if action == None:
#             return JsonResponse({"error": "Missing 'action' param."}, status=status.HTTP_400_BAD_REQUEST, safe=False)
        
#         # Like post
#         if action == "like" and queryset == None:
#             try:
#                 route = Route.objects.get(pk=route_id)
#                 route.liked_by.add(request.user)
#                 route.likes += 1
#                 route.save()
#             except Route.DoesNotExist:
#                 return Response({"error": "Route ceased to exist while adding like."}, status=status.HTTP_404_NOT_FOUND)

#             return JsonResponse({"success": "Liked route.", "likes": route.likes, "is_liked": True}, status=status.HTTP_200_OK, safe=False)

#         # Unlike post
#         if action == "unlike" and queryset:
#             queryset.liked_by.remove(request.user)
#             queryset.likes -= 1
#             queryset.save()     

#             return JsonResponse({"success": "Unliked route.", "likes": queryset.likes, "is_liked": False}, status=status.HTTP_200_OK, safe=False)
  
    

@api_view(['GET'])
def walls(request):
    if request.method == "GET":
        queryset = Wall.objects.all().order_by("name")

        location_id = request.query_params.get("location_id")
        if location_id:
            queryset = queryset.filter(location__pk=location_id)

        data = PostWallSerializer(queryset, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def wall(request, wall_id):
    if request.method == "GET":
        try:
            wall = Wall.objects.get(pk=wall_id)
        except Wall.DoesNotExist:
            return JsonResponse({"error": "Wall not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)
        
        data = GetWallSerializer(wall).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def locations(request):
    if request.method == "GET":
        locations = Location.objects.all().order_by("name")
        data = PostLocationSerializer(locations, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(['GET'])
def location(request, location_id):
    if request.method == "GET":
        try:
            location = Location.objects.get(pk=location_id)
        except Location.DoesNotExist:
            return JsonResponse({"error": "Location not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)
        
        data = PostLocationSerializer(location).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)