from django.contrib import admin
from .models import Restaurant, Profile, Review, Favorite

admin.site.register(Restaurant)
admin.site.register(Profile)
admin.site.register(Review)
admin.site.register(Favorite)
