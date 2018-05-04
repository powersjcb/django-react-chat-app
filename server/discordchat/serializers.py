from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from .models import Message, Channel, Membership


class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(
        min_length=8,
        write_only=True,
    )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
        )

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user


class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = (
            'text',
            'nonce',
            'id',
            'created_at',
            'updated_at',
            'user',
        )


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = (
            'id',
            'name',
            'created_at',
            'updated_at',
        )


class ChannelDetailSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)
    admin = UserSerializer(read_only=True)

    class Meta(ChannelSerializer.Meta):
        fields = ChannelSerializer.Meta.fields + (
            'members',
            'admin'
        )


class MembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    channel = ChannelSerializer(read_only=True)

    class Meta:
        model = Membership
        fields = (
            'id',
            'user',
            'channel',
        )
