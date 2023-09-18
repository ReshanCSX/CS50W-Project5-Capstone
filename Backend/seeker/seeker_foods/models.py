from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

class Restaurants(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    cuisine = models.CharField(max_length=30)
    city = models.CharField(max_length=30, null=False, blank=False)
    country = models.CharField(max_length=30, null=False, blank=False)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)    
    

    def __str__(self):
        return f"{self.name} {self.location} {self.rating}"

