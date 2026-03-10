from rest_framework import serializers
from .models import Conversation, Message
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import RefreshToken

class ConversationSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'title', 'created_at', 'updated_at', 'user']

    def get__id(self, obj):
        return obj._id
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
class MessageSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'role', 'content', 'created_at']

    def get__id(self, obj):
        return obj._id
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
