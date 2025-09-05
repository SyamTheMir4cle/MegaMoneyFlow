# backend/core/reports.py
from django.db import models
from .models import Akun, DetailJurnal
from django.db.models import Sum

def hitung_laba_rugi(tanggal_awal, tanggal_akhir):
    """
    Menghitung laporan laba rugi berdasarkan rentang tanggal.
    """
    # 1. Ambil semua total transaksi untuk akun Pendapatan
    pendapatan = Akun.objects.filter(
        kategori='Pendapatan'
    ).annotate(
        total=Sum(
            'detailjurnal__kredit', 
            filter=models.Q(detailjurnal__jurnal__tanggal__range=[tanggal_awal, tanggal_akhir])
        ) - Sum(
            'detailjurnal__debit', 
            filter=models.Q(detailjurnal__jurnal__tanggal__range=[tanggal_awal, tanggal_akhir])
        )
    ).values('nama_akun', 'total')

    # 2. Ambil semua total transaksi untuk akun Beban
    beban = Akun.objects.filter(
        kategori='Beban'
    ).annotate(
        total=Sum(
            'detailjurnal__debit', 
            filter=models.Q(detailjurnal__jurnal__tanggal__range=[tanggal_awal, tanggal_akhir])
        ) - Sum(
            'detailjurnal__kredit', 
            filter=models.Q(detailjurnal__jurnal__tanggal__range=[tanggal_awal, tanggal_akhir])
        )
    ).values('nama_akun', 'total')
    
    # 3. Hitung totalnya
    total_pendapatan = sum(item['total'] or 0 for item in pendapatan)
    total_beban = sum(item['total'] or 0 for item in beban)
    laba_bersih = total_pendapatan - total_beban

    # 4. Susun data untuk dikirim ke frontend
    hasil = {
        'pendapatan': list(pendapatan),
        'beban': list(beban),
        'total_pendapatan': total_pendapatan,
        'total_beban': total_beban,
        'laba_bersih': laba_bersih
    }
    
    return hasil