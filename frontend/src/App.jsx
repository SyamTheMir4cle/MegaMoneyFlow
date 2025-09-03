// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CoAPage from './pages/CoAPage';
import JournalPage from './pages/JournalPage';
import ReportPage from './pages/ReportPage';
import { Toaster } from 'react-hot-toast'; 
import './index.css';

// Komponen NavLink kustom untuk styling
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


function App() {
  return (
    <Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      {/* Container Utama dengan Latar Belakang */}
      <div className="bg-slate-100 min-h-screen font-sans text-slate-800 antialiased">
        
        {/* Wrapper Konten dengan Lebar Maksimum & Centering */}
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">

          {/* Header */}
          <header className="text-center my-8">
            <h1 className="text-5xl font-bold tracking-tight text-blue-900">
              MegaMoneyFlow
            </h1>
            <p className="text-slate-500 mt-2">Sistem Akuntansi Internal MVP</p>
          </header>

          {/* Navigasi */}
          <nav className="flex justify-center items-center space-x-8 mb-8">
            <StyledNavLink to="/">Akun (CoA)</StyledNavLink>
            <StyledNavLink to="/jurnal">Jurnal Umum</StyledNavLink>
            <StyledNavLink to="/laporan">Laporan</StyledNavLink>
          </nav>

          {/* Area Konten Utama (Kartu Putih) */}
          <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            <Routes>
              <Route path="/" element={<CoAPage />} />
              <Route path="/jurnal" element={<JournalPage />} />
              <Route path="/laporan" element={<ReportPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="text-center mt-8 text-slate-400 text-sm">
            <p>Copyright &copy; {new Date().getFullYear()} PT MEGA TAMA ENERCO. All Rights Reserved.</p>
          </footer>
          
        </div>
      </div>
    </Router>
  );
}

export default App;