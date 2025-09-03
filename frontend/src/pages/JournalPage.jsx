// src/pages/JournalPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

// Impor komponen UI kustom kita
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Table, { TableRow, TableCell } from '../components/ui/Table';

function JournalPage() {
  const [accounts, setAccounts] = useState([]);
  const [journalHeader, setJournalHeader] = useState({
    tanggal: new Date().toISOString().slice(0, 10),
    deskripsi: '',
  });
  const [journalLines, setJournalLines] = useState([
    { akun: '', debit: '', kredit: '' },
    { akun: '', debit: '', kredit: '' },
  ]);
  const [totals, setTotals] = useState({ debit: 0, kredit: 0 });
  const [isBalanced, setIsBalanced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiClient.get('/akun/');
        setAccounts(response.data);
      } catch (error) {
        console.error('Gagal mengambil data akun:', error);
        toast.error('Gagal memuat daftar akun.');
      }
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    let totalDebit = 0;
    let totalKredit = 0;
    journalLines.forEach(line => {
      totalDebit += parseFloat(line.debit) || 0;
      totalKredit += parseFloat(line.kredit) || 0;
    });
    setTotals({ debit: totalDebit, kredit: totalKredit });
    setIsBalanced(totalDebit === totalKredit && totalDebit > 0);
  }, [journalLines]);

  const handleHeaderChange = (e) => {
    setJournalHeader({ ...journalHeader, [e.target.name]: e.target.value });
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
      toast.error('Total Debit dan Kredit harus seimbang!');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Menyimpan jurnal...');

    const payload = {
      ...journalHeader,
      detail_jurnal: journalLines
        .map(line => ({
          akun: line.akun,
          debit: parseFloat(line.debit) || 0,
          kredit: parseFloat(line.kredit) || 0,
        }))
        .filter(line => line.akun),
    };

    try {
      await apiClient.post('/jurnal/', payload);
      toast.dismiss(loadingToast);
      toast.success('Jurnal berhasil disimpan!');
      setJournalHeader({ tanggal: new Date().toISOString().slice(0, 10), deskripsi: '' });
      setJournalLines([{ akun: '', debit: '', kredit: '' }, { akun: '', debit: '', kredit: '' }]);
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Gagal menyimpan jurnal:', error);
      toast.error('Gagal menyimpan jurnal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tableHeaders = ['Akun', 'Debit', 'Kredit', 'Aksi'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-700 mb-6">Input Jurnal Umum</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Tanggal</label>
              <Input type="date" name="tanggal" value={journalHeader.tanggal} onChange={handleHeaderChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-500">Deskripsi</label>
              <Input type="text" name="deskripsi" value={journalHeader.deskripsi} onChange={handleHeaderChange} placeholder="Deskripsi Transaksi" required />
            </div>
          </div>

          <Table headers={tableHeaders}>
            {journalLines.map((line, index) => (
              <TableRow key={index}>
                <TableCell>
                  <select name="akun" value={line.akun} onChange={(e) => handleLineChange(index, e)} required className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Pilih Akun</option>
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>{acc.kode_akun} - {acc.nama_akun}</option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <Input type="number" name="debit" value={line.debit} onChange={(e) => handleLineChange(index, e)} placeholder="0" />
                </TableCell>
                <TableCell>
                  <Input type="number" name="kredit" value={line.kredit} onChange={(e) => handleLineChange(index, e)} placeholder="0" />
                </TableCell>
                <TableCell>
                  <Button type="button" onClick={() => removeLine(index)} variant="secondary">
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>

          <div className="flex justify-between items-center mt-6">
            <Button type="button" onClick={addNewLine}>
              Tambah Baris
            </Button>
            <div className="text-right font-semibold">
              <p>Total Debit: <span className="text-green-600">{totals.debit.toLocaleString()}</span></p>
              <p>Total Kredit: <span className="text-red-600">{totals.kredit.toLocaleString()}</span></p>
              {isBalanced ? <p className="text-green-600">SEIMBANG</p> : <p className="text-red-600">TIDAK SEIMBANG</p>}
            </div>
          </div>

          <div className="border-t mt-6 pt-6 text-right">
            <Button type="submit" disabled={!isBalanced || isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Jurnal'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default JournalPage;