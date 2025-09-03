// src/pages/ReportPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div>
      <h2>Daftar Jurnal</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Detail Transaksi (Debit/Kredit)</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr key={journal.id}>
                <td>{journal.tanggal}</td>
                <td>{journal.deskripsi}</td>
                <td>
                  <ul>
                    {journal.detail_jurnal.map((detail, index) => (
                      <li key={index}>
                        Akun ID {detail.akun}: 
                        Debit {parseFloat(detail.debit).toLocaleString()}, 
                        Kredit {parseFloat(detail.kredit).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPage;