import { useRef } from 'react';
import { BarcodeComponent } from './BarcodeComponent';
import html2pdf from 'html2pdf.js';
import { useProduct } from '../hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import '../styles/GeneratePDF.css';

export const GeneratePDF = () => {

    const { products } = useProduct()
    const nav = useNavigate()
    const contenidoRef = useRef(null);

    const exportarPdf = () => {
        const elemento = contenidoRef.current;
        const opciones = {
            margin: 0.5,
            filename: 'catalogo_codigos.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true }, // Subí el scale para mejor nitidez en los códigos
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'], avoid: '.barcode-card' }
        };
        html2pdf().set(opciones).from(elemento).save();
    };

    console.log(products)

    return (
        <div className="pdf-generator-container">

            {/* Header con Título centrado y Botón a la derecha */}
            <header className="pdf-header">
                <div className="header-spacer"></div> {/* Espaciador para equilibrar el centro */}
                <h2 className="main-title">Generador de Catálogo</h2>
                <div className='container-buttons'>
                    <button className="btn-volver" onClick={() => nav('/Inicio')}>
                        Volver
                    </button>
                    <button className="btn-download" onClick={exportarPdf}>
                        Descargar PDF
                    </button>
                </div>
            </header>

            {/* Grid de Productos (Lo que se verá en pantalla y en el PDF) */}
            <main className="pdf-export-template" ref={contenidoRef}>
                <h1 className="pdf-only-title">Catálogo de Productos</h1>

                <div className="barcode-grid">
                    {products?.map((p) => (
                        <div key={p.id} className="barcode-card">
                            <p className="product-name">{p.nombre}</p>
                            <BarcodeComponent value={p.code} />
                        </div>
                    ))}
                </div>
            </main>

        </div>
    );
};