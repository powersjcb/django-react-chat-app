from django.contrib.auth.models import User
from rest_framework import generics

from .models import Message
from .serializers import MessageSerializer, UserSerializer


class UserRegistration(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []


class MessageDetail(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        # todo: override here to set owner, save(user=self.request.user)
        serializer.save()
