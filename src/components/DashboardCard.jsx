import React, { useState } from 'react';
import { CircleDollarSign, Award, TrendingUp, TrendingDown } from 'lucide-react';
import '../styles/DashboardCard.css';

export const DashboardCard = ({ reportes }) => {
    const [filtroActivo, setFiltroActivo] = useState('promedio/mes');

    const reporteActual = reportes?.find(r => r.tipo_reporte === filtroActivo) || {};

    const {
        id_reporte = 'N/A',
        monto_promedio = 0,
        producto_mas_vendido = 'Sin datos',
        tendencia = 0 
    } = reporteActual;

    return (
        <div className="reporte-card-pro">
            <div className="reporte-header-pro">
                <div className="reporte-header-info">
                    <h2 className="reporte-titulo-pro">Rendimiento de Ventas</h2>
                    <span className="reporte-id-pro">Ref: {id_reporte}</span>
                </div>

                <div className="reporte-tabs">
                    <button
                        className={`tab-button ${filtroActivo === 'promedio/dia' ? 'active' : ''}`}
                        onClick={() => setFiltroActivo('promedio/dia')}
                    >
                        Diario
                    </button>
                    <button
                        className={`tab-button ${filtroActivo === 'promedio/mes' ? 'active' : ''}`}
                        onClick={() => setFiltroActivo('promedio/mes')}
                    >
                        Mensual
                    </button>
                    <button
                        className={`tab-button ${filtroActivo === 'promedio/annio' ? 'active' : ''}`}
                        onClick={() => setFiltroActivo('promedio/annio')}
                    >
                        Anual
                    </button>
                </div>
            </div>

            <div className="reporte-body-pro">
                {/* Widget 1: Monto Promedio */}
                <div className="reporte-widget">
                    <div className="widget-header">
                        <CircleDollarSign size={20} className="widget-icon-svg" color="#3b82f6" />
                        <h3 className="widget-title">Promedio de Ingresos</h3>
                    </div>
                    <div className="widget-content">
                        <p className="widget-value">${monto_promedio.toLocaleString('es-CL')}</p>

                        <span className={`widget-trend ${tendencia >= 0 ? 'positive' : 'negative'}`}>
                            {tendencia >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {Math.abs(tendencia)}% vs periodo anterior
                        </span>
                    </div>
                </div>

                {/* Widget 2: Producto Estrella */}
                <div className="reporte-widget">
                    <div className="widget-header">
                        <Award size={20} className="widget-icon-svg" color="#f59e0b" />
                        <h3 className="widget-title">Producto Estrella</h3>
                    </div>
                    <div className="widget-content">
                        <p className="widget-value-text">{producto_mas_vendido}</p>
                        <p className="widget-subtitle">Líder en volumen de ventas</p>
                    </div>
                </div>
            </div>
        </div>
    );
};