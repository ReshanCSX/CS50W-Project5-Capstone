from django.shortcuts import render, HttpResponse
from .serializers import ResturentsSerializer, CreateResturentsSerializer
from .models import Restaurants
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status, generics


class HomeView(generics.ListAPIView):

    queryset = Restaurants.objects.all()[:5]
    serializer_class = ResturentsSerializer


class SearchView(generics.ListAPIView):
    
    serializer_class = ResturentsSerializer

    def get_queryset(self):
        queryset = Restaurants.objects.all()

        search_query = self.request.query_params.get('q', None)

        if search_query:
            queryset = Restaurants.objects.filter(Q(name__contains=search_query) | Q(city__contains=search_query) | Q(country__contains=search_query) | Q(cuisine__contains=search_query))

        return queryset
    

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


        serializer = CreateResturentsSerializer(data=request.data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    




