// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoAPage from './pages/CoAPage';
import JournalPage from './pages/JournalPage';
import ReportPage from './pages/ReportPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <h1>MegaMoneyFlow MVP</h1>
        <Navbar />
        <hr />
        <Routes>
          <Route path="/" element={<CoAPage />} />
          <Route path="/jurnal" element={<JournalPage />} />
          <Route path="/laporan" element={<ReportPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;