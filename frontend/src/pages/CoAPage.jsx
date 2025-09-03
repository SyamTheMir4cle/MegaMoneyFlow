// src/pages/CoAPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';

// Impor komponen UI kustom kita
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table, { TableRow, TableCell } from '../components/ui/Table';

function CoAPage() {
  // === STATE MANAGEMENT ===
  // Menyimpan daftar akun dari API
  const [accounts, setAccounts] = useState([]);
  // Menyimpan data dari form tambah akun baru
  const [newAccount, setNewAccount] = useState({ kode_akun: '', nama_akun: '', kategori: '' });
  // Status loading untuk pengambilan data awal
  const [isLoading, setIsLoading] = useState(true);
  // Status loading khusus untuk proses submit form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === REFS UNTUK ANIMASI ===
  const containerRef = useRef(null);

  // === DATA FETCHING ===
  const fetchAccounts = async () => {
    try {
      // Tidak set isLoading di sini agar tidak memicu animasi ulang saat refresh
      const response = await apiClient.get('/akun/');
      setAccounts(response.data);
    } catch (error) {
      console.error('Gagal mengambil data akun:', error);
      toast.error('Gagal memuat daftar akun.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Efek untuk mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchAccounts();
  }, []); // [] artinya hanya berjalan sekali

  // === ANIMASI ===
  // Efek untuk menjalankan animasi GSAP setelah data selesai dimuat
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      gsap.from(containerRef.current.children, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }
  }, [isLoading]); // Berjalan setiap kali status isLoading berubah

  // === HANDLER FUNCTIONS ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAccount.kode_akun || !newAccount.nama_akun) {
      toast.error('Kode dan Nama Akun wajib diisi!');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToast = toast.loading('Menyimpan akun...');

    try {
      await apiClient.post('/akun/', newAccount);
      toast.dismiss(loadingToast);
      toast.success('Akun berhasil ditambahkan!');
      setNewAccount({ kode_akun: '', nama_akun: '', kategori: '' }); // Reset form
      fetchAccounts(); // Ambil ulang daftar akun terbaru
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Gagal menambahkan akun:', error);
      toast.error('Gagal menambahkan akun. Cek konsol untuk detail.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tableHeaders = ['Kode Akun', 'Nama Akun', 'Kategori'];

  // === JSX (RENDER) ===
  return (
    <div ref={containerRef}>
      <h2 className="text-3xl font-bold text-slate-700 mb-6">
        Daftar Akun Perkiraan (CoA)
      </h2>
      
      <Card className="mb-8">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl mb-4 font-semibold text-slate-600">Tambah Akun Baru</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Kode Akun</label>
              <Input
                type="text" name="kode_akun" value={newAccount.kode_akun}
                onChange={handleInputChange} placeholder="e.g., 1-10100" required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Nama Akun</label>
              <Input
                type="text" name="nama_akun" value={newAccount.nama_akun}
                onChange={handleInputChange} placeholder="e.g., Kas BCA" required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-500">Kategori</label>
              <Input
                type="text" name="kategori" value={newAccount.kategori}
                onChange={handleInputChange} placeholder="e.g., Aset"
              />
            </div>
            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Akun'}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <Card>
        <h3 className="text-xl mb-4 font-semibold text-slate-600">Daftar Akun</h3>
        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data akun...</p>
        ) : (
          <Table headers={tableHeaders}>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.kode_akun}</TableCell>
                <TableCell className="font-medium">{account.nama_akun}</TableCell>
                <TableCell>{account.kategori}</TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}

export default CoAPage;