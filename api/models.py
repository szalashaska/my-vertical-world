from django.contrib.auth.models import AbstractUser
from django.db import models
from random import choice
from string import ascii_letters


def rename_image(instance, filename):
    extension = filename.split('.')[-1]
    # Creates random string: https://www.educative.io/answers/how-to-generate-a-random-string-in-python
    random_string = "".join(choice(ascii_letters) for i in range(10))
    new_filename = f"{random_string}.{extension}"
    return f"images/{new_filename}"

class User(AbstractUser):
    pass

class Follows(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followed_users = models.ManyToManyField(User, related_name="followed_users", blank=True)


class Location(models.Model):
    name =  models.TextField(max_length=50, null=True)
    # coords = models.CharField(null=True) ??


class Route(models.Model):
    GRADES = (
        ("4a", "4a"),
        ("4b", "4b"),
        ("4c", "4c"),

        ("5a", "5a"),
        ("5b", "5b"),
        ("5c", "5c"),

        ("6a", "6a"),
        ("6b", "6b"),
        ("6c", "6c"),

        ("7a", "7a"),
        ("7b", "7b"),
        ("7c", "7c"),

        ("8a", "8a"),
        ("8b", "8b"),
        ("8c", "8c"),

        ("9a", "9a"),
        ("9b", "9b"),
        ("9c", "9c"),
        
    )
    # null=True -> null values allowed, blank=True -> allows empty input
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(blank=True, null=True, upload_to=rename_image)
    path = models.JSONField(null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    grade = models.CharField(max_length=5, null=True, choices=GRADES)
    description = models.TextField(max_length=500, null=True, blank=True)
    likes = models.ManyToManyField(User, related_name="liked_route")


class Comment(models.Model):
    author =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    body = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True, null=True)

