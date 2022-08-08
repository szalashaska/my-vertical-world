from dataclasses import fields
from rest_framework.serializers import ModelSerializer, ReadOnlyField, PrimaryKeyRelatedField
from .models import User, Route, Location, Wall

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username")


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
        fields = ("id", "author", "name", "path", "location", 
        "wall", "grade", "description", "created")





# class UserSerializer(ModelSerializer):
#     route_author = PrimaryKeyRelatedField(queryset =  Route.objects.all(), many=True)
#     class Meta:
#         model = User
#         fields = ("id", "username", "route_author")

# class RouteSerializer(ModelSerializer):
#     author = ReadOnlyField(source='author.username')
#     class Meta:
#         model = Route
#         fields = ("id", "author", "name", "path", "location", 
#         "wall", "grade", "description", "created")

