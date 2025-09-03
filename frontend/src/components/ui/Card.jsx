// src/components/ui/Card.jsx

import React from 'react';

function Card({ children, className }) {
  return (
    <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export default Card;