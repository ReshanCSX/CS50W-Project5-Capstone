from rest_framework import serializers
from .models import Restaurant, User
from rest_framework_simplejwt.tokens import RefreshToken


class RestaurantSerializer(serializers.ModelSerializer):

    location = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'location', 'cuisine', 'phone_number', 'email', 'website')

    def get_location(self, object):
        location = object.city + "," + object.country

        return location

class CreateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('name', 'cuisine', 'city', 'country', 'phone_number', 'email', 'website')

class RegistrationSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(write_only=True, required=True)
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id','username', 'email', 'password', 'password2', 'token')
        extra_kwargs = {'password' : {'write_only':True}}

    
    def get_token(self, user):

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )

        password = validated_data['password']
        password2 = validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Password must match'})
        
        user.set_password(password)
        user.save()

        return user
    