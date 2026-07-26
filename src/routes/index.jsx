import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '../components/layouts/AuthLayout';
import PemilikLayout from '../components/layouts/PemilikLayout';
import PenghuniLayout from '../components/layouts/PenghuniLayout';

import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import PemilikDashboard from '../pages/dashboard/PemilikDashboard';
import PemilikKamar from '../pages/kamar/PemilikKamar';
import PemilikFormKamar from '../pages/kamar/PemilikFormKamar';
import PemilikPenyewaan from '../pages/penyewaan/PemilikPenyewaan';
import PemilikTagihan from '../pages/tagihan/PemilikTagihan';
import PemilikPembayaran from '../pages/pembayaran/PemilikPembayaran';
import PemilikKeluhan from '../pages/keluhan/PemilikKeluhan';
import PemilikProfil from '../pages/profil/PemilikProfil';

import PenghuniDashboard from '../pages/dashboard/PenghuniDashboard';
import PenghuniKamar from '../pages/kamar/PenghuniKamar';
import PenghuniAjukanSewa from '../pages/penyewaan/PenghuniAjukanSewa';
import PenghuniRiwayatSewa from '../pages/penyewaan/PenghuniRiwayatSewa';
import PenghuniTagihan from '../pages/tagihan/PenghuniTagihan';
import PenghuniBayar from '../pages/pembayaran/PenghuniBayar';
import PenghuniKeluhan from '../pages/keluhan/PenghuniKeluhan';
import PenghuniProfil from '../pages/profil/PenghuniProfil';

export const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { element: <AuthLayout />, children: [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ]},
  { element: <ProtectedRoute role="pemilik"><PemilikLayout /></ProtectedRoute>, children: [
    { path: '/pemilik/dashboard', element: <PemilikDashboard /> },
    { path: '/pemilik/kamar', element: <PemilikKamar /> },
    { path: '/pemilik/kamar/tambah', element: <PemilikFormKamar /> },
    { path: '/pemilik/kamar/:id/edit', element: <PemilikFormKamar /> },
    { path: '/pemilik/penyewaan', element: <PemilikPenyewaan /> },
    { path: '/pemilik/tagihan', element: <PemilikTagihan /> },
    { path: '/pemilik/pembayaran', element: <PemilikPembayaran /> },
    { path: '/pemilik/keluhan', element: <PemilikKeluhan /> },
    { path: '/pemilik/profil', element: <PemilikProfil /> },
  ]},
  { element: <ProtectedRoute role="penghuni"><PenghuniLayout /></ProtectedRoute>, children: [
    { path: '/penghuni/dashboard', element: <PenghuniDashboard /> },
    { path: '/penghuni/kamar', element: <PenghuniKamar /> },
    { path: '/penghuni/penyewaan/ajukan', element: <PenghuniAjukanSewa /> },
    { path: '/penghuni/penyewaan', element: <PenghuniRiwayatSewa /> },
    { path: '/penghuni/tagihan', element: <PenghuniTagihan /> },
    { path: '/penghuni/tagihan/bayar/:id', element: <PenghuniBayar /> },
    { path: '/penghuni/keluhan', element: <PenghuniKeluhan /> },
    { path: '/penghuni/profil', element: <PenghuniProfil /> },
  ]},
  { path: '*', element: <Navigate to="/" replace /> },
]);
