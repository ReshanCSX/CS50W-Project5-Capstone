from django.shortcuts import render, HttpResponse
from .serializers import RestaurantSerializer, CreateRestaurantSerializer, RegistrationSerializer, CreateReviewSerializer, FavoriteSerializer
from .models import Restaurant, Favorite, User, Review
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


@permission_classes([AllowAny])
@authentication_classes([])
class HomeView(generics.ListAPIView):
    queryset = Restaurant.objects.all()[:6]
    serializer_class = RestaurantSerializer


@permission_classes([AllowAny])
@authentication_classes([])
class SearchView(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.all()

        search_query = self.request.query_params.get('q', None)

        if search_query:
            queryset = Restaurant.objects.filter(Q(name__contains=search_query) | Q(city__contains=search_query) | Q(country__contains=search_query) | Q(cuisine__contains=search_query))

        return queryset


@permission_classes([IsAuthenticated])
class CreatePlaceView(generics.CreateAPIView):

    # Add http before an URL 
    @staticmethod
    def prepend_http_if_needed(url):
        if not url.startswith("http://") and not url.startswith("https://"):
            return "http://" + url
        return url

    # Save Listing
    def post(self, request):
    
        if len(request.data['website']) > 0:
            request.data['website'] = self.prepend_http_if_needed(request.data['website'])


        serializer = CreateRestaurantSerializer(data=request.data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
@authentication_classes([])
class RegisterView(generics.CreateAPIView):     

    serializer_class = RegistrationSerializer


@permission_classes([AllowAny])
@authentication_classes([JWTAuthentication])
class PlaceDetailsView(generics.RetrieveAPIView):

    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    lookup_field = 'id'


@permission_classes([IsAuthenticated])
class SubmitReviewView(generics.CreateAPIView):

    serializer_class = CreateReviewSerializer


@permission_classes([IsAuthenticated])
class Favorites(generics.CreateAPIView):

    serializer_class = FavoriteSerializer