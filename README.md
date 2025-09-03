# MegaMoneyFlow: Sistem Akuntansi Internal

**MegaMoneyFlow** adalah aplikasi akuntansi berbasis web yang dirancang untuk berjalan sepenuhnya *offline* di jaringan lokal (LAN) perusahaan. Sistem ini menyediakan fitur akuntansi esensial dengan fokus pada keamanan data, kecepatan akses, dan independensi dari koneksi internet.

## 📖 Tentang Proyek

Proyek ini dibangun untuk memenuhi kebutuhan perusahaan akan sistem akuntansi yang terpusat, aman, dan berada di bawah kendali penuh internal. Dengan berjalan secara *on-premise*, semua data sensitif keuangan tidak pernah meninggalkan jaringan perusahaan, meminimalkan risiko keamanan dan memastikan operasional bisnis tetap berjalan lancar bahkan saat koneksi internet terputus.

Arsitektur aplikasi ini modern, memisahkan logika bisnis (backend) dari antarmuka pengguna (frontend) untuk kemudahan pengembangan dan pemeliharaan.

## ✨ Fitur Utama

  - [x] **Manajemen Akun Perkiraan (CoA):** Struktur akun hierarkis yang fleksibel.
  - [x] **Jurnal Umum:** Pencatatan transaksi *double-entry*.
  - [x] **Siklus Pembelian:** Manajemen faktur dan pembayaran utang.
  - [x] **Manajemen Kas & Bank:** Pencatatan penerimaan dan pembayaran.
  - [x] **Inventaris Aset Tetap:** Pelacakan dan manajemen aset perusahaan.
  - [x] **Catatan Gaji Karyawan:** Modul untuk pencatatan penggajian.
  - [x] **Laporan Keuangan:** Generate laporan Laba Rugi, Neraca, dan Buku Besar.
  - [x] **Keuangan Proyek:** Modul terpisah untuk melacak biaya per proyek.

## 🛠️ Tumpukan Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Backend** | Python 3.11+, Django 5.x |
| **API** | Django REST Framework |
| **Database** | PostgreSQL 16+ |
| **Frontend** | React.js / Vue.js |
| **Deployment**| Docker, Nginx, Gunicorn |

## 🏗️ Arsitektur & Deployment

Aplikasi ini menggunakan model **Client-Server On-Premise**. Seluruh komponen diinstal pada satu server fisik atau VM di dalam kantor, dan pengguna mengaksesnya melalui browser dari komputer masing-masing.

```
[ SERVER LOKAL DI KANTOR (Contoh IP: 192.168.1.100) ]
  - Database (PostgreSQL)
  - Backend (Django API)
  - Frontend (React/Vue Build)
           ^
           | (Terhubung via Kabel LAN / WiFi Internal)
           |
 [ PC Karyawan 1 ] --- [ PC Karyawan 2 ] --- [ PC Karyawan 3 ]
 (Akses via http://192.168.1.100 di Browser)
```

## 🚀 Instalasi & Konfigurasi

Berikut adalah langkah-langkah umum untuk menjalankan proyek ini di lingkungan development.

**Prasyarat:**

  - Git
  - Python 3.11+ & Pip
  - Node.js & NPM
  - PostgreSQL Server

**1. Clone Repositori**

```bash
git clone [URL_REPO_ANDA]
cd MegaMoneyFlow
```

**2. Konfigurasi Backend**

```bash
# Masuk ke direktori backend
cd backend

# Buat dan aktifkan virtual environment
python -m venv venv
source venv/bin/activate  # (Untuk Linux/macOS)
# venv\Scripts\activate   # (Untuk Windows)

# Install dependensi
pip install -r requirements.txt

# Konfigurasi file .env (salin dari .env.example)
cp .env.example .env
# Edit file .env dengan kredensial database Anda

# Jalankan migrasi database
python manage.py migrate
```

**3. Konfigurasi Frontend**

```bash
# Masuk ke direktori frontend
cd ../frontend

# Install dependensi
npm install

# Konfigurasi file .env (jika ada, untuk URL API backend)
cp .env.example .env
```

## ▶️ Menjalankan Aplikasi (Mode Development)

Anda perlu menjalankan backend dan frontend secara terpisah di terminal yang berbeda.

**1. Jalankan Server Backend:**

```bash
# Dari direktori backend/
python manage.py runserver
# Server API akan berjalan di http://127.0.0.1:8000
```

**2. Jalankan Server Frontend:**

```bash
# Dari direktori frontend/
npm start
# Aplikasi akan terbuka di browser pada http://localhost:3000
```

## 📋 Status Proyek

Proyek ini sedang dalam tahap pengembangan aktif.

## ©️ Hak Cipta & Lisensi

Proyek ini bersifat **proprietary** dan merupakan aset intelektual milik perusahaan.

**Copyright (c) 2025 PT MEGA TAMA ENERCO. All Rights Reserved.**

Dilarang keras mereproduksi, mendistribusikan, memodifikasi, atau menggunakan ulang kode dalam proyek ini untuk tujuan apa pun tanpa izin tertulis dari pemilik hak cipta.