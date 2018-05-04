from django.contrib.auth.models import User
from rest_framework import (
    decorators,
    generics,
    mixins,
    permissions,
    viewsets,
)

from discordchat.models import (
    Channel,
    Message,
    Membership,
)
from discordchat.serializers import (
    ChannelSerializer,
    ChannelDetailSerializer,
    MembershipSerializer,
    MessageSerializer,
    UserSerializer,
)


# from restframework docs:
# http://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#adding-required-permissions-to-views
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user


class OwnerPrivate(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class AuthAPIView(generics.ListCreateAPIView):
    object_permissions = (
        IsOwnerOrReadOnly,
    )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserRegistration(AuthAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ()


class MessageDetail(AuthAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class ChannelViewSet(mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer

    @decorators.action(methods=['get'], detail=True)
    def messages(self, request, *args, **kwargs):
        self.serializer_class = ChannelDetailSerializer
        self.queryset = self.queryset.prefetch_related('members')
        return self.retrieve(request, *args, **kwargs)


class MembershipDetail(AuthAPIView):
    object_permissions = [OwnerPrivate]
    serializer_class = MembershipSerializer

    def get_queryset(self):
        return Membership.objects.filter(
            user=self.request.user,
        )

