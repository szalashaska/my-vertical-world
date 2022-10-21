from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from .models import User, Route, Location, Wall, Comment, Follow

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username")


class CommentSerializer(ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = ("id", "author", "body", "created")


class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name", "coordinates")


class WallSerializer(ModelSerializer):
    location = LocationSerializer()
    class Meta:
        model = Wall
        fields = ("id", "name", "image", "image_width", "image_height", "location")


class RouteSerializer(ModelSerializer):
    author = UserSerializer()
    location = LocationSerializer()
    wall = WallSerializer()
    class Meta:
        model = Route
        fields = ("id", "author", "name", "location", 
        "wall", "grade", "description", "created", "likes")


class FollowSerializer(ModelSerializer):
    user = UserSerializer()
    followed_users = UserSerializer(many=True)
    class Meta:
        model = Follow
        fields = ("id", "user", "followed_users")


class RouteExtendedSerializer(ModelSerializer):
    author = UserSerializer()
    location = LocationSerializer()
    wall = WallSerializer()
    comments = CommentSerializer(many=True)

    class Meta:
        model = Route
        fields = ("id", "author", "name", "path", "location", 
        "wall", "grade", "description", "created", "likes", "comments")


class WallExtendedSerializer(ModelSerializer):
    author = UserSerializer()
    routes = RouteExtendedSerializer(many=True)
    location = LocationSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Wall
        fields = ("id", "author", "name", "likes", "image", "image_width", "image_height", "routes", "location", "comments", "created")


class LocationExtendedSerializer(ModelSerializer):
    author = UserSerializer()
    walls = WallSerializer(many=True)
    routes = RouteSerializer(many=True)
    comments = CommentSerializer(many=True)
    class Meta:
        model = Location
        fields = ("id", "author", "name", "coordinates", "likes", "walls", "routes", "comments", "created")


class UserExtendedSerializer(ModelSerializer):
    route_author = RouteSerializer(many=True)
    wall_author = WallSerializer(many=True)
    location_author = LocationSerializer(many=True)
    liked_routes = RouteSerializer(many=True)
    liked_walls = WallSerializer(many=True)
    liked_locations = LocationSerializer(many=True)
    class Meta:
        model = User
        fields = ("id", "username", "route_author", "wall_author", "location_author", "liked_routes", "liked_walls", "liked_locations")


