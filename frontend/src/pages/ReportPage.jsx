// src/pages/ReportPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Komponen kecil untuk format angka
const Currency = ({ value }) => (
  <span className={value < 0 ? 'text-red-600' : 'text-slate-800'}>
    {value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
  </span>
);

function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dates, setDates] = useState({
    tanggal_awal: new Date(new Date().setDate(1)).toISOString().slice(0, 10),
    tanggal_akhir: new Date().toISOString().slice(0, 10),
  });

  const fetchReport = async (awal, akhir) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/laporan/laba-rugi/', {
        params: { tanggal_awal: awal, tanggal_akhir: akhir },
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Gagal mengambil data laporan:', error);
      toast.error('Gagal memuat data laporan.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(dates.tanggal_awal, dates.tanggal_akhir);
  }, []);

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchReport(dates.tanggal_awal, dates.tanggal_akhir);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-700 mb-6">Laporan Laba Rugi</h2>
      
      <Card className="mb-8">
        <form onSubmit={handleFilterSubmit} className="flex flex-col sm:flex-row items-end space-y-2 sm:space-y-0 sm:space-x-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Tanggal Awal</label>
            <Input type="date" name="tanggal_awal" value={dates.tanggal_awal} onChange={handleDateChange} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Tanggal Akhir</label>
            <Input type="date" name="tanggal_akhir" value={dates.tanggal_akhir} onChange={handleDateChange} />
          </div>
          <Button type="submit">Tampilkan</Button>
        </form>
      </Card>

      <Card>
        {isLoading ? (
          <p className="text-center text-gray-500">Menghitung laporan...</p>
        ) : reportData ? (
          <div>
            <h3 className="text-xl font-semibold text-center mb-1">PT MEGA TAMA ENERCO</h3>
            <h4 className="text-lg font-semibold text-center mb-4">Laporan Laba Rugi</h4>
            <p className="text-center text-gray-500 mb-6">Untuk Periode {dates.tanggal_awal} s/d {dates.tanggal_akhir}</p>

            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-lg mb-2">Pendapatan</h5>
                {reportData.pendapatan.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span>{item.nama_akun}</span>
                    <Currency value={item.total || 0} />
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 font-bold border-t-2 mt-2">
                  <span>Total Pendapatan</span>
                  <Currency value={reportData.total_pendapatan} />
                </div>
              </div>

              <div>
                <h5 className="font-bold text-lg mb-2">Beban</h5>
                {reportData.beban.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span>{item.nama_akun}</span>
                    <Currency value={item.total || 0} />
                  </div>
                ))}
                <div className="flex justify-between items-center py-2 font-bold border-t-2 mt-2">
                  <span>Total Beban</span>
                  <Currency value={reportData.total_beban} />
                </div>
              </div>

              <div className="flex justify-between items-center py-3 font-extrabold text-xl bg-gray-100 px-4 rounded-md">
                <span>Laba (Rugi) Bersih</span>
                <Currency value={reportData.laba_bersih} />
              </div>
            </div>
          </div>
        ) : (
          <p>Tidak ada data untuk ditampilkan.</p>
        )}
      </Card>
    </div>
  );
}

export default ReportPage;