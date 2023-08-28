from django.shortcuts import render
from django.http import HttpResponse
from .serializers import ResturentsSerializer
from .models import Restaurants

from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import api_view


class HomeView(generics.ListAPIView):
    queryset = Restaurants.objects.all()
    serializer_class = ResturentsSerializer
