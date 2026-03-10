from django.db import models

# Create your models here.
class Conversation(models.Model):
    _id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return self.title if self.title else f"Conversation {self._id}"

class Message(models.Model):
    _id = models.AutoField(primary_key=True)
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    role = models.CharField(max_length=50)  # e.g., 'user' or 'assistant'
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message {self._id} in Conversation {self.conversation._id}"