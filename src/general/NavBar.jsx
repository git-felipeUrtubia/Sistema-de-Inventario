import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, PlusSquare, Settings } from 'lucide-react';
import '../styles/Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función para determinar si el botón debe estar activo
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Box className="nav-icon" />
        <span>StockMaster Pro</span>
      </div>
      
      <div className="navbar-links">
        <button 
          onClick={() => navigate('/inicio')} 
          className={`nav-button ${isActive('/inicio') ? 'active' : ''}`}
        >
          <LayoutDashboard className="nav-icon" />
          Inicio
        </button>

        <button 
          onClick={() => navigate('/inventory')} 
          className={`nav-button ${isActive('/inventory') ? 'active' : ''}`}
        >
          <Box className="nav-icon" />
          Inventario
        </button>
        
        <button 
          onClick={() => navigate('/add-product')} 
          className={`nav-button ${isActive('/add-product') ? 'active' : ''}`}
        >
          <PlusSquare className="nav-icon" />
          Nuevo Producto
        </button>

        <button 
          onClick={() => navigate('/ajustes')} 
          className={`nav-button ${isActive('/ajustes') ? 'active' : ''}`}
        >
          <Settings className="nav-icon" />
          Ajustes
        </button>
      </div>
    </nav>
  );
};