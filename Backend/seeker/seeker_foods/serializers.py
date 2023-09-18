from rest_framework import serializers
from .models import Restaurants

class ResturentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ('__all__')

class CreateResturentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ('name', 'cuisine', 'city', 'country', 'phone_number', 'email', 'website')