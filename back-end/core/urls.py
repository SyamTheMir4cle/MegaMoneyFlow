
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AkunViewSet, JurnalViewSet, LabaRugiReportView # <-- Impor view baru

router = DefaultRouter()
router.register(r'akun', AkunViewSet)
router.register(r'jurnal', JurnalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Daftarkan URL baru untuk laporan
    path('laporan/laba-rugi/', LabaRugiReportView.as_view(), name='laporan-laba-rugi'),
]