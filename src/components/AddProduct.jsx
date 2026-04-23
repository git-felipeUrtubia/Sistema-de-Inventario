import React, { useEffect, useState } from 'react';
import { saveProduct } from '../api/Products.js';
import { generatedCode } from '../utils/CodeGenerator.js';
import { Loader2, CheckCircle } from 'lucide-react';
import '../styles/AddProduct.css';

export const AddProduct = () => {

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const initialFormState = {
    nombre: '',
    code: '',
    categoria: '',
    precio: '',
    stock: ''
  };

  const [productData, setProductData] = useState({
    nombre: '',
    code: '',
    categoria: '',
    precio: '',
    stock: ''
  });

  const fetchSaveProduct = async (formData) => {
    try {

      const res = await saveProduct(formData)
      return res;

    } catch (error) {
      console.log("Error al guardar producto: ", error)
      alert("Error al guardar producto")
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData({ 
      ...productData, [name]: value.toLowerCase() 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    productData.code = generatedCode();
    productData.nombre = productData.nombre.trim();
    
    const res = await fetchSaveProduct(productData)

    if (res.status === 200) {
      setLoading(false)
      setShowSuccess(true)
      setProductData({ ...initialFormState });
    }

  };

  useEffect(() => {

    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 2000);

      return () => clearTimeout(timer)
    }

  }, [showSuccess])

  return (
    <div className="form-container">
      <h2 className="form-title">Registrar Nuevo Producto</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="input-group">
          <label>Nombre del Producto</label>
          <input
            type="text"
            name="nombre"
            value={productData.nombre}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Ej. Laptop Gamer Pro"
            required
          />
        </div>

        <div className="input-group">
          <label>Categoría</label>
          <select
            name="categoria"
            value={productData.categoria}
            onChange={handleInputChange}
            className="input-field"
            required
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

        <div className="form-row">
          <div className="input-group">
            <label>Precio ($)</label>
            <input
              type="number"
              name="precio"
              value={productData.precio}
              onChange={handleInputChange}
              className="input-field"
              placeholder="0"
              step="1"
              required
            />
          </div>

          <div className="input-group">
            <label>Stock Inicial</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleInputChange}
              className="input-field"
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn-save"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="spinner-icon" />
                <span>Guardando...</span>
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle size={20} />
                <span>¡Guardado!</span>
              </>
            ) : (
              "Guardar Producto"
            )}
          </button>

        </div>
      </form>
    </div>
  );
};
