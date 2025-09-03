// src/components/ui/Button.jsx

import React from 'react';

function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false }) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;