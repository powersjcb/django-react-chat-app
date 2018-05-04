import graphene
from discordchat import schema
from discordchat.models import Message


class CreateMessage(graphene.Mutation):
    Output = schema.MessageType

    class Arguments:
        text = graphene.String()
        nonce = graphene.String()

    def mutate(self, info, **kwargs):
        return Message.objects.create(
            **kwargs,
            user=info.context.user,
        )


class Mutations(object):
    create_message = CreateMessage.Field()