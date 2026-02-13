from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import AuthorViewSet, NovelViewSet, SoftwareViewSet, QuickLinkViewSet

router = DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'novels', NovelViewSet)
router.register(r'software', SoftwareViewSet)
router.register(r'quick-links', QuickLinkViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', obtain_auth_token, name='api_token_auth'),
]
