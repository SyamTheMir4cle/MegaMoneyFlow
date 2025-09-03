# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AkunViewSet, JurnalViewSet

router = DefaultRouter()
router.register(r'akun', AkunViewSet)
router.register(r'jurnal', JurnalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]