from django.shortcuts import render, HttpResponse
from .serializers import ResturentSerializer, CreateResturentSerializer
from .models import Restaurant
from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class HomeView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Restaurant.objects.all()[:5]
    serializer_class = ResturentSerializer


class SearchView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResturentSerializer

    def get_queryset(self):
        queryset = Restaurant.objects.all()

        search_query = self.request.query_params.get('q', None)

        if search_query:
            queryset = Restaurant.objects.filter(Q(name__contains=search_query) | Q(city__contains=search_query) | Q(country__contains=search_query) | Q(cuisine__contains=search_query))

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


        serializer = CreateResturentSerializer(data=request.data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginView(generics.CreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def print(self, request):
        print(request.data)

    




