import React, { useState, useEffect } from 'react';
import { PrintBarcodes } from '../components/PrintBarcodes';
import { findAllProducts } from '../api/Products.js';
import { LayoutDashboard, Package, Printer } from 'lucide-react';
import '../styles/Inicio.css';

export const Inicio = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await findAllProducts();
                setProductos(res.data || []);
            } catch (error) {
                console.error("Error al cargar datos para el inicio:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <div className="inicio-container">
            <header className="inicio-welcome">
                <div className="welcome-text">
                    <h1>Bienvenido al Sistema de Inventario</h1>
                    <p>Gestiona tus productos y etiquetas de forma rápida.</p>
                </div>
                <LayoutDashboard size={48} className="welcome-icon" />
            </header>

            <div className="inicio-cards-grid">
                
                <div className="stat-card">
                    <Package size={24} />
                    <div className="stat-info">
                        <h3>Total Productos</h3>
                        <p className="stat-number">{loading ? '...' : productos.length}</p>
                    </div>
                </div>

                <div className="action-card">
                    <h3>Acciones de Etiquetas</h3>
                    <p>Genera un documento con todos los códigos de barras registrados.</p>
                    <div className="action-button-wrapper">
                        <PrintBarcodes productos={productos} />
                    </div>
                </div>
            </div>
        </div>
    );
};
