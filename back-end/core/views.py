from rest_framework import viewsets
from rest_framework.views import APIView           
from rest_framework.response import Response       
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated # <-- Impor ini
from .models import Akun, Jurnal
from .serializers import AkunSerializer, JurnalSerializer
from .reports import hitung_laba_rugi
import datetime


class AkunViewSet(viewsets.ModelViewSet):
    queryset = Akun.objects.all().order_by('kode_akun')
    serializer_class = AkunSerializer
    permission_classes = [IsAuthenticated]

class JurnalViewSet(viewsets.ModelViewSet):
    queryset = Jurnal.objects.all().order_by('-tanggal')
    serializer_class = JurnalSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Sekarang request.user adalah user yang login, bukan lagi user pertama
        serializer.save(dibuat_oleh=self.request.user)


class LabaRugiReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Ambil tanggal dari parameter URL, jika tidak ada, gunakan default bulan ini
        today = datetime.date.today()
        tanggal_awal_str = request.query_params.get('tanggal_awal', today.replace(day=1).strftime('%Y-%m-%d'))
        tanggal_akhir_str = request.query_params.get('tanggal_akhir', today.strftime('%Y-%m-%d'))
        
        # Panggil fungsi kalkulasi
        data_laporan = hitung_laba_rugi(tanggal_awal_str, tanggal_akhir_str)
        
        return Response(data_laporan)