from django.contrib import admin
from .models import User, Follows, Location, Route, Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Follows)
admin.site.register(Location)
admin.site.register(Route)
admin.site.register(Comment)