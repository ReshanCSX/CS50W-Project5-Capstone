from django.shortcuts import render
from .serializers import ResturentsSerializer
from .models import Restaurants

from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import api_view


class HomeView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = ResturentsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        name = self.request.query_params.get('name', None)
        location = self.request.query_params.get('location', None)

        if name:
            queryset = queryset.filter(name=name.title())
        if location:
            queryset = queryset.filter(city=location.title())

        return queryset




