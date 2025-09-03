// src/components/ui/Table.jsx

import React from 'react';

function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b-2 border-gray-200 text-sm text-gray-600 uppercase">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

// Opsional: Kita bisa buat sub-komponen untuk baris dan sel agar lebih rapi
export function TableRow({ children, className }) {
  return <tr className={`border-b border-gray-100 hover:bg-gray-50 ${className}`}>{children}</tr>;
}

export function TableCell({ children, className }) {
  return <td className={`p-3 ${className}`}>{children}</td>;
}

export default Table;