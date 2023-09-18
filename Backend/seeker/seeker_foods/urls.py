from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view()),
    path('search', views.SearchView.as_view()),
    path('createlisting', views.CreatePlace.as_view())
]