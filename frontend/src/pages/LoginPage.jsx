// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import toast from 'react-hot-toast';

// Impor komponen UI
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading('Logging in...');

    try {
      const response = await apiClient.post('/token/', { username, password });
      // Di dunia nyata, Anda akan menyimpan token ini di AuthContext
      // Untuk sekarang kita simpan di localStorage
      localStorage.setItem('authToken', JSON.stringify(response.data));
      
      toast.dismiss(loadingToast);
      toast.success('Login berhasil!');
      navigate('/'); // Arahkan ke halaman utama setelah login
      window.location.reload(); // Reload untuk memastikan semua state terupdate
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Login gagal:', error);
      toast.error('Login gagal. Periksa kembali username dan password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Enercore Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Loading...' : 'Log In'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;