from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('conversations/', views.conversation_list_view, name="conversations"),
    path('conversations/<str:pk>/', views.conversation_detail_view, name="conversation"),
]