import { Routes, Route, Navigate } from 'react-router-dom';
import { Inicio } from '../pages/Inicio';
import { AddProduct } from '../components/AddProduct';
import { Inventory } from '../components/Inventory';
import { MainLayout } from '../components/MainLayout';
import { Ajustes } from '../pages/Ajustes';
import { GeneratePDF } from '../components/GeneratePDF';
import { useProduct } from '../hooks/useProduct';
import { Dashboard } from '../pages/Dashboard';

export const AppRoutes = () => {

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Navigate to="/inicio" replace />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/ajustes" element={<Ajustes />} />

      </Route>

      <Route path="/generate-pdf" element={<GeneratePDF />} />

    </Routes>
  );
};