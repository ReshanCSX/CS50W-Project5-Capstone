from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

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
    
    def average_rating(self):
        average =  self.restaurant_reviews.aggregate(models.Avg('rating'))['rating__avg']
        return round(average, 2) if average else None
    
    def get_each_rating(self):
        return self.restaurant_reviews.values('rating').annotate(count=models.Count('id'))


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username}'


class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_reviews")
    location = models.ForeignKey("Restaurant", on_delete=models.CASCADE, related_name="restaurant_reviews")
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    content = models.CharField(max_length=1000, null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.reviewer} wrote a {self.rating} review on {self.location}'
