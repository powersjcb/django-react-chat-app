import graphene
import discordchat.schema


class RootQuery(
    discordchat.schema.Query,
    graphene.ObjectType):
    """
    this class will inherit form multiple Queries
    as we begin to add more apps to the project
    """
    pass


schema = graphene.Schema(query=RootQuery)