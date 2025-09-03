// src/components/ui/Input.jsx

import React from 'react';

function Input(props) {
  return (
    <input
      {...props}
      className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default Input;