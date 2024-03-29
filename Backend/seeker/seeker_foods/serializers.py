from rest_framework import serializers
from .models import Restaurant, User, Review, Favorite
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.humanize.templatetags.humanize import naturaltime


class RestaurantSerializer(serializers.ModelSerializer):

    location = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    eachRating = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'location', 'cuisine', 'rating', 'eachRating', 'phone_number', 'email', 'website', 'reviews', 'is_favorited')

    def get_location(self, object):
        location = object.city + "," + object.country

        return location
    
    def get_reviews(self, object):
        reviews = ReviewSerializer(object.restaurant_reviews.all(), many=True)

        return reviews.data
    
    def get_rating(self, object):
        return round(object.average_rating(), 1) if object.average_rating() else 0
    
    def get_eachRating(self, object):
        return object.get_each_rating()
    
    def get_is_favorited(self, object):

        request = self.context.get('request')

        if request and bool(request.user and request.user.is_authenticated):
            
            if(object.bookmarked_users.filter(user=request.user.id)):
                return True
            else:
                return False
        else:
            return None


class CreateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id', 'name', 'cuisine', 'city', 'country', 'phone_number', 'email', 'website')


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
    

class ReviewSerializer(serializers.ModelSerializer):

    reviewer = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ('reviewer', 'content', 'rating', 'timestamp')

    def get_reviewer(self, object):
        return object.reviewer.username
    
    def get_timestamp(self, object):
        return naturaltime(object.timestamp)


class CreateReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        exclude = ('reviewer', 'location')


    def create(self, validated_data):

        request = self.context.get('request')
        location_id = self.context.get('view').kwargs['id']

        reviewer =  User.objects.get(username=request.user)
        location = Restaurant.objects.get(id=location_id)

        review = Review(
            reviewer=reviewer,
            location=location,
            **validated_data
        )

        review.save()
        
        return review
    

class FavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = ('user',)

    def create(self, validated_data):

        request = self.context.get('request')
        location_id = self.context.get('view').kwargs['location']

        request_user =  User.objects.get(username=request.user)
        location = Restaurant.objects.get(id=location_id)

        favorite = Favorite(
            user = request_user,
            favorites = location
        )

        return favorite