from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

class Restaurants(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    city = models.CharField(max_length=30, null=False, blank=False)
    rating = models.IntegerField(validators=(MinValueValidator(1), MaxValueValidator(5)), null=False, blank=False)
    phone_number = models.CharField(max_length=12)
    cuisine = models.CharField(max_length=30)

    def __str__(self):
        return self.name, self.location, self.rating

