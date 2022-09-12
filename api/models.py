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


class Follow(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followed_users = models.ManyToManyField(User, related_name="followed_users", blank=True)

    def __str__(self):
        return f"{self.user}"


class Location(models.Model):
    name =  models.TextField(max_length=50, null=True)
    coordinates = models.JSONField(null=True) 
    likes = models.PositiveIntegerField(null=False, blank=False, editable=False, default="0")
    liked_by = models.ManyToManyField(User, related_name="liked_locations")

    def __str__(self):
        return f"{self.name}"


class Wall(models.Model):
    name = models.TextField(max_length=50, null=True)
    image = models.ImageField(blank=True, null=True, upload_to=rename_image, height_field="image_height", width_field="image_width")
    image_height = models.PositiveIntegerField(null=True, blank=True, editable=False, default="0")
    image_width = models.PositiveIntegerField(null=True, blank=True, editable=False, default="0")
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name="walls")
    likes = models.PositiveIntegerField(null=False, blank=False, editable=False, default="0")
    liked_by = models.ManyToManyField(User, related_name="liked_walls")

    def __str__(self):
        return f"{self.name}"
    


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
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="route_author")
    name = models.TextField(max_length=50, null=True)
    path = models.JSONField(null=True)
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True, related_name="routes")
    wall = models.ForeignKey(Wall, on_delete=models.SET_NULL, null=True, related_name="routes")
    grade = models.CharField(max_length=5, null=True, choices=GRADES)
    description = models.TextField(max_length=500, null=True, blank=True)
    likes = models.PositiveIntegerField(null=False, blank=False, editable=False, default="0")
    liked_by = models.ManyToManyField(User, related_name="liked_routes")
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.name} {self.grade} by {self.author}"


class Comment(models.Model):
    author =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, null=True, related_name="comments")
    wall = models.ForeignKey(Wall, on_delete=models.CASCADE, null=True, related_name="comments")
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True, related_name="comments")
    body = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.author}'s comment created {self.created}"

