// src/pages/JournalPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

function JournalPage() {
  // 1. STATE MANAGEMENT
  const [accounts, setAccounts] = useState([]); // Untuk dropdown pilihan akun
  const [journalHeader, setJournalHeader] = useState({
    tanggal: new Date().toISOString().slice(0, 10), // Default tanggal hari ini
    deskripsi: '',
  });
  const [journalLines, setJournalLines] = useState([
    { akun: '', debit: '', kredit: '' },
    { akun: '', debit: '', kredit: '' },
  ]);
  const [totals, setTotals] = useState({ debit: 0, kredit: 0 });
  const [isBalanced, setIsBalanced] = useState(false);

  // 2. DATA FETCHING (EFFECT)
  useEffect(() => {
    // Ambil daftar akun untuk dropdown
    const fetchAccounts = async () => {
      try {
        const response = await apiClient.get('/akun/');
        setAccounts(response.data);
      } catch (error) {
        console.error('Gagal mengambil data akun:', error);
      }
    };
    fetchAccounts();
  }, []);

  // 3. CALCULATION (EFFECT)
  useEffect(() => {
    // Hitung ulang total setiap kali baris jurnal berubah
    let totalDebit = 0;
    let totalKredit = 0;
    journalLines.forEach(line => {
      totalDebit += parseFloat(line.debit) || 0;
      totalKredit += parseFloat(line.kredit) || 0;
    });
    setTotals({ debit: totalDebit, kredit: totalKredit });
    setIsBalanced(totalDebit === totalKredit && totalDebit > 0);
  }, [journalLines]);


  // 4. HANDLER FUNCTIONS
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setJournalHeader({ ...journalHeader, [name]: value });
  };

  const handleLineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLines = [...journalLines];
    updatedLines[index][name] = value;
    setJournalLines(updatedLines);
  };

  const addNewLine = () => {
    setJournalLines([...journalLines, { akun: '', debit: '', kredit: '' }]);
  };

  const removeLine = (index) => {
    const updatedLines = journalLines.filter((_, i) => i !== index);
    setJournalLines(updatedLines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isBalanced) {
      alert('Total Debit dan Kredit harus seimbang dan tidak boleh nol!');
      return;
    }
    const payload = {
      ...journalHeader,
      detail_jurnal: journalLines.map(line => ({
        akun: line.akun,
        debit: parseFloat(line.debit) || 0,
        kredit: parseFloat(line.kredit) || 0,
      })).filter(line => line.akun), // Hanya kirim baris yang akunnya diisi
    };
    try {
      await apiClient.post('/jurnal/', payload);
      alert('Jurnal berhasil disimpan!');
      // Reset form
      setJournalHeader({ tanggal: new Date().toISOString().slice(0, 10), deskripsi: '' });
      setJournalLines([{ akun: '', debit: '', kredit: '' }, { akun: '', debit: '', kredit: '' }]);
    } catch (error) {
      console.error('Gagal menyimpan jurnal:', error);
      alert('Gagal menyimpan jurnal.');
    }
  };

  // 5. JSX (RENDER)
  return (
    <div>
      <h2>Input Jurnal Umum</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tanggal: </label>
          <input type="date" name="tanggal" value={journalHeader.tanggal} onChange={handleHeaderChange} required />
        </div>
        <div>
          <label>Deskripsi: </label>
          <input type="text" name="deskripsi" value={journalHeader.deskripsi} onChange={handleHeaderChange} placeholder="Deskripsi Transaksi" required style={{ width: '300px' }} />
        </div>
        
        <table border="1" cellPadding="5" cellSpacing="0" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Akun</th>
              <th>Debit</th>
              <th>Kredit</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {journalLines.map((line, index) => (
              <tr key={index}>
                <td>
                  <select name="akun" value={line.akun} onChange={(e) => handleLineChange(index, e)} required>
                    <option value="">Pilih Akun</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>{acc.kode_akun} - {acc.nama_akun}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" name="debit" value={line.debit} onChange={(e) => handleLineChange(index, e)} /></td>
                <td><input type="number" name="kredit" value={line.kredit} onChange={(e) => handleLineChange(index, e)} /></td>
                <td><button type="button" onClick={() => removeLine(index)}>Hapus</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addNewLine} style={{ marginTop: '10px' }}>Tambah Baris</button>
        
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          <p>Total Debit: {totals.debit.toLocaleString()}</p>
          <p>Total Kredit: {totals.kredit.toLocaleString()}</p>
          {isBalanced ? <p style={{ color: 'green' }}>SEIMBANG</p> : <p style={{ color: 'red' }}>TIDAK SEIMBANG</p>}
        </div>

        <button type="submit" disabled={!isBalanced} style={{ marginTop: '10px' }}>Simpan Jurnal</button>
      </form>
    </div>
  );
}

export default JournalPage;