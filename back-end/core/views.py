from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Akun, Jurnal
from .serializers import AkunSerializer, JurnalSerializer

class AkunViewSet(viewsets.ModelViewSet):
    queryset = Akun.objects.all().order_by('kode_akun')
    serializer_class = AkunSerializer

class JurnalViewSet(viewsets.ModelViewSet):
    queryset = Jurnal.objects.all().order_by('-tanggal')
    serializer_class = JurnalSerializer

    def perform_create(self, serializer):
        # Untuk MVP, kita hardcode user pertama sebagai pembuat jurnal
        user = User.objects.first() 
        serializer.save(dibuat_oleh=user) # <-- UBAH BARIS INI