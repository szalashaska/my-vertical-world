from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    body = models.TextField()