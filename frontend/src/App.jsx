// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 

// Import Halaman
import CoAPage from './pages/CoAPage';
import JournalPage from './pages/JournalPage';
import ReportPage from './pages/ReportPage';
import LoginPage from './pages/LoginPage';

import './index.css';

// 1. KOMPONEN NAVLINK KUSTOM ANDA (TETAP ADA)
const StyledNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg font-medium transition-colors duration-300
        ${isActive ? 'text-blue-900' : 'text-gray-500 hover:text-blue-800'}`
      }
    >
      {children}
    </NavLink>
  );
};

// 2. KOMPONEN RUTE TERPROTEKSI (SATPAM)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Jika tidak ada tiket, tendang ke halaman login
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 3. KOMPONEN LAYOUT UTAMA (CETAKAN HALAMAN)
// Layout yang indah dari versi sebelumnya sekarang kita pindahkan ke sini
const AppLayout = () => (
  <div className="bg-slate-100 min-h-screen font-sans text-slate-800 antialiased">
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <header className="text-center my-8">
        <h1 className="text-5xl font-bold tracking-tight text-blue-900">
          Enercore
        </h1>
        <p className="text-slate-500 mt-2">Sistem Akuntansi Internal</p>
      </header>

      <nav className="flex justify-center items-center space-x-8 mb-8">
        <StyledNavLink to="/">Akun (CoA)</StyledNavLink>
        <StyledNavLink to="/jurnal">Jurnal Umum</StyledNavLink>
        <StyledNavLink to="/laporan">Laporan</StyledNavLink>
      </nav>

      <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        {/* Halaman akan dirender di sini, tapi pathnya diatur di komponen App utama */}
        <Routes>
          <Route path="/" element={<CoAPage />} />
          <Route path="/jurnal" element={<JournalPage />} />
          <Route path="/laporan" element={<ReportPage />} />
          {/* Tambahkan rute lain di dalam layout di sini */}
        </Routes>
      </main>

      <footer className="text-center mt-8 text-slate-400 text-sm">
        <p>Copyright &copy; {new Date().getFullYear()} PT MEGA TAMA ENERCO. All Rights Reserved.</p>
      </footer>
    </div>
  </div>
);

// 4. FUNGSI APP UTAMA (ROUTER UTAMA)
function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Rute publik untuk halaman login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Semua rute lainnya ('/*') dilindungi oleh ProtectedRoute */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;