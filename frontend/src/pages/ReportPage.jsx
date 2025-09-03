// src/pages/ReportPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast'; // <-- Impor toast

// Impor komponen UI
import Card from '../components/ui/Card';
import Table, { TableRow, TableCell } from '../components/ui/Table';

function ReportPage() {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/jurnal/');
        setJournals(response.data);
      } catch (error) {
        console.error('Gagal mengambil data jurnal:', error);
        toast.error('Gagal memuat data jurnal.'); // <-- Tambah notifikasi eror
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const tableHeaders = ['Tanggal', 'Deskripsi', 'Detail Transaksi'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-700 mb-6">Daftar Jurnal</h2>
      <Card>
        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data jurnal...</p>
        ) : (
          <Table headers={tableHeaders}>
            {journals.map((journal) => (
              <TableRow key={journal.id}>
                <TableCell>{journal.tanggal}</TableCell>
                <TableCell>{journal.deskripsi}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-5">
                    {journal.detail_jurnal.map((detail, index) => (
                      <li key={index} className="text-sm">
                        Akun ID {detail.akun}:
                        <span className="text-green-600 ml-2">D: {parseFloat(detail.debit).toLocaleString()}</span>,
                        <span className="text-red-600 ml-2">K: {parseFloat(detail.kredit).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}
      </Card>
    </div>
  );
}

export default ReportPage;