from django.db import models
from django.contrib.auth.models import User

# Model untuk Chart of Accounts (CoA)
class Akun(models.Model):
    kode_akun = models.CharField(max_length=20, unique=True)
    nama_akun = models.CharField(max_length=100)
    # Kategori disederhanakan untuk Neraca Saldo
    kategori = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.kode_akun} - {self.nama_akun}"

# Model untuk Jurnal
class Jurnal(models.Model):
    tanggal = models.DateField()
    deskripsi = models.CharField(max_length=255)
    dibuat_oleh = models.ForeignKey(User, on_delete=models.PROTECT)

# Model untuk baris Debit/Kredit di dalam Jurnal
class DetailJurnal(models.Model):
    jurnal = models.ForeignKey(Jurnal, on_delete=models.CASCADE, related_name='detail_jurnal')
    akun = models.ForeignKey(Akun, on_delete=models.PROTECT)
    debit = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    kredit = models.DecimalField(max_digits=20, decimal_places=2, default=0)