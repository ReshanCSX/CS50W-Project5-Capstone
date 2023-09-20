from django.db import models
from django.contrib.auth.models import User

class Restaurant(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    cuisine = models.CharField(max_length=30, null=False, blank=False)
    city = models.CharField(max_length=30, null=False, blank=False)
    country = models.CharField(max_length=30, null=False, blank=False)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)    
    

    def __str__(self):
        return f"Restaurant {self.name}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username}'
