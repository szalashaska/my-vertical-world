from django.contrib import admin
from .models import User, Follow, Location, Wall, Route, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Follow)
admin.site.register(Location)
admin.site.register(Wall)
admin.site.register(Route)
admin.site.register(Comment)