
import { BarcodeComponent } from './BarcodeComponent.jsx';
import { useNavigate } from 'react-router-dom';
import '../styles/PrintBarcodes.css';

export const PrintBarcodes = ({ productos }) => {
    const nav = useNavigate();
    

    return (
        <>
            <button className="btn-print-all" onClick={ () => { nav('/generate-pdf') } }>
                Generar PDF
            </button>
        </>
    );
};