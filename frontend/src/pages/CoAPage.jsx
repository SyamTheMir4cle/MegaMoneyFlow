// src/pages/CoAPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

function CoAPage() {
  // 1. STATE MANAGEMENT
  const [accounts, setAccounts] = useState([]); // Menyimpan daftar akun dari API
  const [newAccount, setNewAccount] = useState({ // Menyimpan data dari form
    kode_akun: '',
    nama_akun: '',
    kategori: '',
  });
  const [isLoading, setIsLoading] = useState(true); // Status loading data

  // 2. DATA FETCHING (EFFECT)
  useEffect(() => {
    fetchAccounts();
  }, []); // [] artinya efek ini hanya berjalan sekali saat komponen dimuat

  const fetchAccounts = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/akun/');
      setAccounts(response.data);
    } catch (error) {
      console.error('Gagal mengambil data akun:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. HANDLER FUNCTIONS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form me-refresh halaman
    if (!newAccount.kode_akun || !newAccount.nama_akun || !newAccount.kategori) {
      alert('Semua field wajib diisi!');
      return;
    }
    try {
      await apiClient.post('/akun/', newAccount);
      alert('Akun berhasil ditambahkan!');
      setNewAccount({ kode_akun: '', nama_akun: '', kategori: '' }); // Reset form
      fetchAccounts(); // Ambil ulang daftar akun terbaru
    } catch (error) {
      console.error('Gagal menambahkan akun:', error);
      alert('Gagal menambahkan akun. Cek konsol untuk detail.');
    }
  };

  // 4. JSX (RENDER)
  return (
    <div>
      <h2>Daftar Akun Perkiraan (CoA)</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>Tambah Akun Baru</h3>
        <input
          type="text"
          name="kode_akun"
          value={newAccount.kode_akun}
          onChange={handleInputChange}
          placeholder="Kode Akun (e.g., 1-10100)"
          required
        />
        <input
          type="text"
          name="nama_akun"
          value={newAccount.nama_akun}
          onChange={handleInputChange}
          placeholder="Nama Akun (e.g., Kas)"
          required
        />
        <input
          type="text"
          name="kategori"
          value={newAccount.kategori}
          onChange={handleInputChange}
          placeholder="Kategori (e.g., Aset)"
          required
        />
        <button type="submit">Simpan Akun</button>
      </form>

      <h3>Daftar Akun</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Kode Akun</th>
              <th>Nama Akun</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.kode_akun}</td>
                <td>{account.nama_akun}</td>
                <td>{account.kategori}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoAPage;