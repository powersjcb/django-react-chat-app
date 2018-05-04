from django.db import models
from django.contrib.auth.models import User


class Channel(models.Model):
    members = models.ManyToManyField(
        User,
        through='Membership',
        through_fields=['channel', 'user'],
        related_name='member_of'
    )
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Membership(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nonce = models.UUIDField(null=True)
    text = models.TextField(max_length=2048)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('created_at',)
