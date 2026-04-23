import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hammer, Construction, ArrowLeft } from 'lucide-react';
import '../styles/Maintenance.css';

export const Maintenance = () => {
  const navigate = useNavigate();

  return (
    <div className="maintenance-container">
      <div className="maintenance-icon-wrapper">
        <Construction size={80} className="icon-main" />
        <Hammer size={32} className="icon-sub" />
      </div>
      
      <h1 className="maintenance-title">Sección en Construcción</h1>
      
      <p className="maintenance-text">
        Estamos trabajando para traerte nuevas funcionalidades a 
        <strong> StockMaster Pro</strong>. Esta sección estará disponible muy pronto.
      </p>

      <button 
        className="btn-back-home" 
        onClick={() => navigate('/inventory')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} />
          Ir a Inventario
        </div>
      </button>
    </div>
  );
};