from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nonce = models.UUIDField(null=True)
    text = models.TextField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created_at',)
