import { useState, useMemo } from 'react';
import { Search, Tag, Barcode, Info, PackageSearch } from 'lucide-react';
import '../styles/ProductsFilter.css';

export const ProductsFilter = ({ productos = [] }) => {
  // Estados independientes para cada filtro
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [codigo, setCodigo] = useState('');

  
  const resultados = useMemo(() => {

    // Si no hay nada escrito en ningún filtro, no mostramos nada
    if (!nombre && !categoria && !codigo) return [];

    return productos.filter(p => {
      // 1. Validar nombre (ignora mayúsculas/minúsculas)
      const matchNombre = p.nombre?.toLowerCase().includes(nombre.toLowerCase());
      
      // 2. Validar categoría (si está vacía, acepta todas)
      const matchCategoria = categoria === '' || p.categoria === categoria;
      
      // 3. Validar código (ideal para el escáner)
      const matchCodigo = p.code?.toLowerCase().includes(codigo.toLowerCase());

      // El producto debe cumplir con todos los filtros activos
      return matchNombre && matchCategoria && matchCodigo;
    });
  }, [productos, nombre, categoria, codigo]);

  const isFiltering = nombre || categoria || codigo;

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Búsqueda de Productos</h2>
        <p>Utiliza los filtros o escanea un producto directamente</p>
      </div>

      {/* Controles de Filtro */}
      <div className="filter-controls-grid">
        
        {/* Filtro por Nombre */}
        <div className="filter-input-group">
          <label><Search size={16} /> Buscar por Nombre</label>
          <input 
            type="text" 
            placeholder="Ej: Dark Souls..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Filtro por Categoría */}
        <div className="filter-input-group">
          <label><Tag size={16} /> Categoría</label>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            className="filter-select"
          >
            <option value="">Seleccionar...</option>
            <option value="electrónica">Electrónica</option>
            <option value="accesorios">Accesorios</option>
            <option value="jugueteria">Jugueteria</option>
            <option value="peluqueria">Peluqueria</option>
            <option value="mascotas">Mascotas</option>
            <option value="pasteleria">Pasteleria</option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="escolares">Escolares</option>
          </select>
        </div>

        {/* Filtro por Código (Pistola Escáner) */}
        <div className="filter-input-group highlight-scan">
          <label><Barcode size={16} /> Escanear Código</label>
          <input 
            type="text" 
            placeholder="Haz clic y escanea..."
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="filter-input scan-input"
            autoFocus // Opcional: auto-enfoca este campo al cargar
          />
        </div>

      </div>

      {/* Resultados */}
      <div className="results-scroll-area">
        {!isFiltering ? (
          <div className="empty-state">
            <PackageSearch className="empty-state-icon" />
            <p>Ingresa un nombre, selecciona una categoría o escanea un código.</p>
          </div>
        ) : resultados.length > 0 ? (
          resultados.map(p => (
            <div key={p.id} className="result-item">
              <div className="result-info">
                <span className="result-name">{p.nombre}</span>
                <span className="result-id">Código: {p.code}</span>
              </div>
              <div className="result-meta">
                <span className="badge">{p.categoria}</span>
                <span className="result-stock">Stock: {p.stock}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Info className="empty-state-icon" />
            <p>No se encontraron productos con estos filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};