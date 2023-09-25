from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('home', views.HomeView.as_view()),
    path('search', views.SearchView.as_view()),
    path('createlisting', views.CreatePlaceView.as_view()),
    path('register', views.RegisterView.as_view()),
    path('location/<int:id>', views.PlaceDetailsView.as_view()),

    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)