from django.urls import path
from .views import ConversationViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
#
urlpatterns = [
    path('', ConversationViewSet.as_view({'get': 'list', 'post': 'create'}), name='conversation-list'),
    path('<int:pk>/', ConversationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='conversation-detail'),
    path('chat/', ConversationViewSet.as_view({'post': 'chat'}), name='conversation-chat'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]