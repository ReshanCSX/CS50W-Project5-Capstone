from django.shortcuts import render, HttpResponse
from .serializers import ResturentSerializer, CreateResturentSerializer
from .models import Restaurant
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated


@permission_classes([AllowAny])
@authentication_classes([])
class HomeView(generics.ListAPIView):
    queryset = Restaurant.objects.all()[:6]
    serializer_class = ResturentSerializer


@permission_classes([AllowAny])
@authentication_classes([])
class SearchView(generics.ListAPIView):
    serializer_class = ResturentSerializer

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


        serializer = CreateResturentSerializer(data=request.data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
@authentication_classes([])
class LoginView(generics.CreateAPIView):

    def post(self, request):
        print(request.data)
        return Response(request.data, status=status.HTTP_201_CREATED)

    




