from rest_framework import serializers
from .models import Conversation, Message
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import RefreshToken

class ConversationSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'title', 'created_at', 'updated_at', 'user']

    def get__id(self, obj):
        return obj._id
    
class MessageSerializer(serializers.ModelSerializer):
    _id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'role', 'content', 'created_at']

    def get__id(self, obj):
        return obj._id
