from django.shortcuts import render
from .serializers import ResturentsSerializer
from .models import Restaurants
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import api_view


class HomeView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = ResturentsSerializer


class SearchView(generics.ListAPIView):
    
    serializer_class = ResturentsSerializer

    def get_queryset(self):

        queryset = Restaurants.objects.all()

        search_query = self.request.query_params.get('q', None)

        if search_query:
            queryset = Restaurants.objects.filter(Q(name__contains=search_query) | Q(location__contains=search_query))

        return queryset




