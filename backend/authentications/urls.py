from django.urls import path
from . import views
from rest_framework_simplejwt.views import ( TokenObtainPairView )

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('auth/signin', views.MyTokenObtainPairView.as_view, name="signin"),
    path('auth/signup/', views.MyTokenObtainPairView.as_view, name="signup"),
]