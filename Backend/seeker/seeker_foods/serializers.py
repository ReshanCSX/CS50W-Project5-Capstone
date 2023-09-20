from rest_framework import serializers
from .models import Restaurant, User

class ResturentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('__all__')

class CreateResturentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('name', 'cuisine', 'city', 'country', 'phone_number', 'email', 'website')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')