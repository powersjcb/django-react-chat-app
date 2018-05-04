import graphene
import discordchat.schema
import discordchat.mutations


class RootQuery(discordchat.schema.Query,
                graphene.ObjectType):
    """
    this class will inherit form multiple Queries
    as we begin to add more apps to the project
    """
    pass


class RootMutations(discordchat.mutations.Mutations,
                    graphene.ObjectType):
    pass


schema = graphene.Schema(
    query=RootQuery,
    mutation=RootMutations,
)