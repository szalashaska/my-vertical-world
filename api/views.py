from django.http import JsonResponse
from django.db import IntegrityError
# from django.contrib.auth import authenticate, login, logout

# from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User, Follow, Location, Wall, Route, Comment
from .serilizers import CommentSerializer, FollowSerializer, RouteExtendedSerializer, LocationSerializer, LocationExtendedSerializer, UserExtendedSerializer, WallSerializer, WallExtendedSerializer

import json

# Customizing Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token["username"] = user.username
        
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
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


    return Response({"success": "Successfully registered user."}, status=status.HTTP_201_CREATED)
      

@api_view(["POST", "GET"])
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
            location = Location.objects.create(name=location_name, author=author, coordinates=json.loads(location_coordinates))

        # Create wall or take existing one
        try:
            wall = Wall.objects.get(name=wall_name)
        except Wall.DoesNotExist:
            wall = Wall.objects.create(name=wall_name, author=author) 
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
        data = RouteExtendedSerializer(routes, many=True).data
     
        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET"])
def walls(request):
    if request.method == "GET":
        queryset = Wall.objects.all().order_by("name")

        location_id = request.query_params.get("location_id")
        if location_id:
            queryset = queryset.filter(location__pk=location_id)

        data = WallSerializer(queryset, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


@api_view(["GET"])
def locations(request):
    if request.method == "GET":
        locations = Location.objects.all().order_by("name")
        data = LocationSerializer(locations, many=True).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)


def handle_content_by_id(model, serializer, request, id):
    try:
        content = model.objects.get(pk=id)
    except model.DoesNotExist:
        return JsonResponse({"error": f"{model.__name__} not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)

    if request.method == "GET":
        data = serializer(content).data
        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)

    if request.method == "DELETE":
        # Check if user is an author of content
        if content.author.id != request.user.id:
            return JsonResponse({"error": "You are not allowed to delete other users content."}, status=status.HTTP_403_FORBIDDEN, safe=False)
       
        # Check if models has children
        if model.__name__ == "Wall" and content.routes.all():
            return JsonResponse({"error": "Can't delete wall when routes are assigned to it."}, status=status.HTTP_403_FORBIDDEN, safe=False)            

        if model.__name__ == "Location" and content.walls.all():
            return JsonResponse({"error": "Can't delete location when walls are assigned to it."}, status=status.HTTP_403_FORBIDDEN, safe=False)

        # Delete content
        content.delete() 

        return JsonResponse({"success": f"Successfully deleted {model.__name__}."}, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "DELETE"])
def route(request, route_id):
    return handle_content_by_id(Route, RouteExtendedSerializer, request, route_id)


@api_view(["GET", "DELETE"])
def wall(request, wall_id):
    return handle_content_by_id(Wall, WallExtendedSerializer, request, wall_id)


@api_view(["GET", "DELETE"])
def location(request, location_id):
    return handle_content_by_id(Location, LocationExtendedSerializer, request, location_id)


@api_view(["GET"])
def user(request, user_id):
    return handle_content_by_id(User, UserExtendedSerializer, request, user_id)


def handle_like_content(model, request, id):
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
                return JsonResponse({"error": f"{model.__name__} ceased to exist while adding like."}, status=status.HTTP_404_NOT_FOUND, safe=False)

            return JsonResponse({"success": f"Liked {model.__name__}.", "likes": content.likes, "is_liked": True}, status=status.HTTP_200_OK, safe=False)

        # Unlike post
        if action == "unlike" and queryset:
            queryset.liked_by.remove(request.user)
            queryset.likes -= 1
            queryset.save()     

            return JsonResponse({"success": f"Unliked {model.__name__}.", "likes": queryset.likes, "is_liked": False}, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def route_likes(request, route_id):
    return handle_like_content(Route, request, route_id)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def wall_likes(request, wall_id):
    return handle_like_content(Wall, request, wall_id)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def location_likes(request, location_id):
    return handle_like_content(Location, request, location_id)    

def handle_comment_content(model, request, id):
    if request.method == "POST":
        body = request.data.get("body")
        if body == None:
            return JsonResponse({"error": "Missing body of comment."}, status=status.HTTP_400_BAD_REQUEST, safe=False)
        # Create comment
        comment = Comment.objects.create(author=request.user, body=body)

        # Save comment
        try:
            content = model.objects.get(pk=id)
            content.comments.add(comment)
            content.save()
        except model.DoesNotExist:
            return JsonResponse({"error": f"{model.__name__} ceased to exist while adding comment."}, status=status.HTTP_404_NOT_FOUND, safe=False)

        # Return updated list of comments
        comments = CommentSerializer(content.comments.order_by("created"), many=True).data
 
        return JsonResponse(comments, status=status.HTTP_200_OK, safe=False)
    if request.method == "DELETE":
        comment_id = request.data.get("comment_id")
        try:
            comment = Comment.objects.get(pk=comment_id)
        except Comment.DoesNotExist:
            return JsonResponse({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND, safe=False)

        if comment.author.id != request.user.id:
            return JsonResponse({"error": "You are not allowed to delete other users comments."}, status=status.HTTP_403_FORBIDDEN, safe=False)
        
        # Delete comment
        comment.delete()

        # Return updated list of comments
        try:
            content = model.objects.get(pk=id)
        except model.DoesNotExist:
            return JsonResponse({"error": f"{model.__name__} ceased to exist while deleting comment."}, status=status.HTTP_404_NOT_FOUND, safe=False)

        # Return updated list of comments
        comments = CommentSerializer(content.comments.order_by("created"), many=True).data

        return JsonResponse(comments, status=status.HTTP_200_OK, safe=False)


@api_view(["POST", "DELETE"])
@permission_classes([IsAuthenticated])
def route_comments(request, route_id):
    return handle_comment_content(Route, request, route_id)


@api_view(["POST", "DELETE"])
@permission_classes([IsAuthenticated])
def wall_comments(request, wall_id):
    return handle_comment_content(Wall, request, wall_id)


@api_view(["POST", "DELETE"])
@permission_classes([IsAuthenticated])
def location_comments(request, location_id):
    return handle_comment_content(Location, request, location_id) 


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def user_follows(request, user_id):
    if user_id == request.user.id:
        return JsonResponse({"error": "You can only follow other users."}, status=status.HTTP_403_FORBIDDEN, safe=False)
    queryset = None

    # Get Follow object
    follower = Follow.objects.filter(user=request.user).first()

    # Query for relationship
    if follower:
        queryset = User.objects.filter(pk=user_id, followed_by=follower).first()

    if request.method == "GET":
        if queryset:
            return JsonResponse({"is_followed": True}, status=status.HTTP_200_OK, safe=False)
        return JsonResponse({"is_followed": False}, status=status.HTTP_200_OK, safe=False)

    if request.method == "PUT":
        action = request.data.get("action")
        if action == None:
            return JsonResponse({"error": "Missing 'action' param."}, status=status.HTTP_400_BAD_REQUEST, safe=False)

        # Follow user
        if action == "follow" and queryset == None:

            # Get Follow object or create it
            if not follower:
                follower = Follow.objects.create(user=request.user)

            try:
                followed = User.objects.get(pk=user_id)
                followed.followed_by.add(follower)
                followed.save()
            except User.DoesNotExist:
                return JsonResponse({"error": "User ceased to exist while adding like."}, status=status.HTTP_404_NOT_FOUND, safe=False)

            return JsonResponse({"success": "Liked user", "is_followed": True}, status=status.HTTP_200_OK, safe=False)

        # Unfollow user
        if action == "unfollow" and queryset:
            queryset.followed_by.remove(follower)
            queryset.save()     

            return JsonResponse({"success": "Unliked user.", "is_followed": False}, status=status.HTTP_200_OK, safe=False)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def get_followers(request, user_id):
    if user_id != request.user.id:
        return JsonResponse({"error": "You can only see your own follows"}, status=status.HTTP_403_FORBIDDEN, safe=False)
    
    if request.method == "GET":
        content = Follow.objects.filter(user=request.user).first()

        if not content:
            return JsonResponse({"followed_users": []}, status=status.HTTP_200_OK, safe=False)       
        data = FollowSerializer(content).data

        return JsonResponse(data, status=status.HTTP_200_OK, safe=False)