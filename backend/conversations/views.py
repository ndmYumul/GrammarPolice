from django.shortcuts import render
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from google import genai
from dotenv import load_dotenv
from rest_framework.decorators import api_view

load_dotenv()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Create your views here.
MODEL_NAME = "models/gemini-2.0-flash"

SYSTEM_PROMPT = """
You are a helpful but strict grammar checker. You will be given a sentence and you need to check if there are any grammar mistakes in the sentence. If there are grammar mistakes, you will correct the sentence and give back the corrected version. If there are no grammar mistakes, you will simply say "No grammar mistakes found.".

Scope - THIS IS A STRICT RULE, NO EXCEPTIONS:
1. You will only check for grammar mistakes. Do not check for spelling mistakes, punctuation mistakes, or any other types of mistakes.
2. If there are grammar mistakes, you will only correct the grammar mistakes and give back the corrected version of the sentence. Do not correct any other types of mistakes.
3. If there are no grammar mistakes, you will simply say "No grammar mistakes found."
4. Never answer with anything other than the corrected sentence or "No grammar mistakes found.".
5. Never engage in any kind of conversation. You are only a grammar checker, nothing more.
"""

@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/v1/conversations/",
        "/api/v1/conversations/<conversation_id>/",
        "/api/v1/chat/",
    ]
    return JsonResponse(routes, safe=False)

@csrf_exempt
@require_http_methods(["POST"])
def chat_view(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data."}, status=400)


    user_message = data.get("message", "")

    if not user_message:
        return JsonResponse({"error": "Message is required."}, status=400)

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=user_message,
            config={
                "system_instruction": SYSTEM_PROMPT,
                "temperature": 0.3,
            },
        )

        ai_reply = response.text

    except Exception as e:
        print(f"Error generating response: {e}")
        return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"reply": ai_reply})

@api_view(["GET"])
def conversation_list_view(request):
    conversations = Conversation.objects.all()
    serializer = ConversationSerializer(conversations, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(["GET"])
def conversation_detail_view(request, conversation_id):
    try:
        conversation = Conversation.objects.get(_id=conversation_id)
    except Conversation.DoesNotExist:
        return JsonResponse({"error": "Conversation not found."}, status=404)

    serializer = ConversationSerializer(conversation)
    return JsonResponse(serializer.data)