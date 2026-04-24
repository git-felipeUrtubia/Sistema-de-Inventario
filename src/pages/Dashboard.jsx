import React from 'react';
import '../styles/Dashboard.css';
import { DashboardCard } from '../components/DashboardCard';
import last_sales from '../mocks/last_sales.json'
import metrics from '../mocks/metricas.json'
import reportes from '../mocks/reportes.json'
import { ShoppingCart, DollarSign, Package, PlusCircle, Boxes, FilePlus, Eye } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    // const navigate = useNavigate();

    

    return (
        <>
            <section className="panel-control-container">
                <header className="panel-control-header">
                    <h1 className="panel-control-title">Panel de Control</h1>
                    <p className="panel-control-subtitle">Resumen de ventas y estado del inventario</p>
                </header>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="card-header-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Ventas de Hoy</h3>
                            <ShoppingCart size={20} color="#6b7280" />
                        </div>
                        <p className="card-value">{metrics.ventasHoy}</p>
                    </div>
                    <div className="metric-card">
                        <div className="card-header-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Ingresos</h3>
                            <DollarSign size={20} color="#6b7280" />
                        </div>
                        <p className="card-value">${metrics.ingresosHoy.toLocaleString('es-CL')}</p>
                    </div>
                    <div className="metric-card">
                        <div className="card-header-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Productos en Catálogo</h3>
                            <Package size={20} color="#6b7280" />
                        </div>
                        <p className="card-value">{metrics.productosActivos}</p>
                    </div>
                </div>

                <div className="panel-control-content">
                    {/* Sección 2: Tabla de Últimas Ventas */}
                    <div className="metric-card table-section">
                        <div className="section-header">
                            <h3 className="card-title">Últimas Ventas</h3>
                            <button className="btn-link">Ver todas</button>
                        </div>
                        <table className="sales-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Método</th>
                                    <th>Total</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {last_sales.map((venta, index) => (
                                    <tr key={venta.id}>
                                        <td><b>{index}</b></td>
                                        <td>{venta.fecha}</td>
                                        <td>{venta.metodo}</td>
                                        <td>${venta.total.toLocaleString('es-CL')}</td>
                                        <td>
                                            <button className="btn-detalle" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Eye size={14} /> Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Sección 3: Acciones Rápidas con Iconos */}
                    <div className="metric-card actions-section">
                        <h3 className="card-title" style={{ marginBottom: '16px' }}>Acciones Rápidas</h3>
                        <div className="action-buttons">
                            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} /* onClick={() => navigate('/nueva-venta')} */>
                                <PlusCircle size={18} />
                                Registrar Nueva Venta
                            </button>
                            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} /* onClick={() => navigate('/inventario')} */>
                                <Boxes size={18} />
                                Gestionar Inventario
                            </button>
                            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} /* onClick={() => navigate('/nuevo-producto')} */>
                                <FilePlus size={18} />
                                Agregar Producto
                            </button>
                        </div>
                    </div>

                </div>

            </section>

            <section className="reporte-section">
                <h1>Reportes</h1>
                <DashboardCard reportes={reportes} />
            </section>
        </>
    );
};