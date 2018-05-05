"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.conf.urls import include

from discordchat import views

from app.views import (
    DRFAuthenticatedGraphQLView,
    DetailedTokenObtainPairView,
)


router = routers.DefaultRouter()
router.register(r'channel', views.ChannelViewSet)


urlpatterns = [
    path('graphql/', csrf_exempt(DRFAuthenticatedGraphQLView.as_view(graphiql=True))),
    path('api/token/',
         DetailedTokenObtainPairView.as_view(),
        name='token_obtain_pair'),
    path('api/token/refresh/',
         TokenRefreshView.as_view(),
        name='token_refresh'),
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(
        title='Messaging App',
        authentication_classes=[],
        permission_classes=[],
    )),
    # todo: could refactor to be permit nesting /user/:id/channels/
    path('message/', views.MessageDetail.as_view()),
    path('user/', views.UserRegistration.as_view()),
    path('membership/', views.MembershipDetail.as_view()),
    path('', include(router.urls)),
]
