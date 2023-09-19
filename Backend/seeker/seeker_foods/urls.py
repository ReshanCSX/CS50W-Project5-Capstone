from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view()),
    path('search', views.SearchView.as_view()),
    path('createlisting', views.CreatePlaceView.as_view())
]