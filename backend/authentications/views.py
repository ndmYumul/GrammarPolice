from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import RegisterSerializer, MyTokenObtainPairSerializer

# Create your views here.
def register_view(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return render(request, 'registration_success.html')
    else:
        serializer = RegisterSerializer()
    return render(request, 'register.html', {'serializer': serializer})

class MyTokenObtainPairView(viewsets.ViewSet):
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = MyTokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return render(request, 'login_success.html', {'token': serializer.validated_data})