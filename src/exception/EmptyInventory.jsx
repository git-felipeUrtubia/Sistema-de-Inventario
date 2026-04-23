import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, PlusCircle } from 'lucide-react';
import '../styles/EmptyInventory.css';

export const EmptyInventory = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-inventory-container">
      <PackageOpen size={64} className="empty-inventory-icon" />
      
      <h2 className="empty-inventory-title">Tu inventario está vacío</h2>
      
      <p className="empty-inventory-text">
        Parece que aún no has registrado ningún producto. 
        Comienza a organizar tu negocio agregando tu primer artículo.
      </p>

      <button 
        className="btn-add-first" 
        onClick={() => navigate('/add-product')}
      >
        <PlusCircle size={20} />
        Registrar mi primer producto
      </button>
    </div>
  );
};