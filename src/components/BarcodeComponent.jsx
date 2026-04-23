import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export const BarcodeComponent = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && value) {
      JsBarcode(barcodeRef.current, value, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 35,
        displayValue: true,
        fontSize: 14,
        margin: 5
      });
    }
  }, [value]);

  // Usar IMG en lugar de SVG para mejor compatibilidad con html2canvas
  return <img ref={barcodeRef} style={{ maxWidth: '100%', height: 'auto' }} />;
};