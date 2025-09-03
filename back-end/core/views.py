from rest_framework import viewsets
from .models import Akun, Jurnal
from .serializers import AkunSerializer, JurnalSerializer

class AkunViewSet(viewsets.ModelViewSet):
    queryset = Akun.objects.all().order_by('kode_akun')
    serializer_class = AkunSerializer

class JurnalViewSet(viewsets.ModelViewSet):
    queryset = Jurnal.objects.all().order_by('-tanggal')
    serializer_class = JurnalSerializer

    def perform_create(self, serializer):
        # Otomatis set user yang login sebagai pembuat jurnal
        serializer.save(dibuat_oleh=self.request.user)