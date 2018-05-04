import graphene
import graphene_django
from django.contrib.auth.models import User
from discordchat.models import Channel, Message, Membership


class MessageType(graphene_django.DjangoObjectType):
    class Meta:
        model = Message


class ChannelType(graphene_django.DjangoObjectType):
    members = graphene.List(MessageType)
    class Meta:
        model = Channel


class UserType(graphene_django.DjangoObjectType):
    class Meta:
        model = User
        only_fields = (
            'id',
            'username',
        )


class Query(graphene.ObjectType):
    user = graphene.Field(
        UserType,
        id=graphene.Int(),
        username=graphene.String()
    )

    def resolve_user(self, info, **kwargs):
        return User.objects.get(**kwargs)

    channel = graphene.Field(
        ChannelType,
        id=graphene.Int(),
        name=graphene.String(),
    )
    def resolve_channel(self, info, **kwargs):
        return Channel.objects.get(**kwargs)
