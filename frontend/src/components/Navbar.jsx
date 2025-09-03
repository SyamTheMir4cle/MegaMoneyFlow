// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Akun (CoA)</Link> |{" "}
      <Link to="/jurnal">Jurnal Umum</Link> |{" "}
      <Link to="/laporan">Laporan</Link>
    </nav>
  );
}

export default Navbar;