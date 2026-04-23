import { useState, useEffect } from 'react';
import '../styles/Inventory.css';
import { ProductsFilter } from './ProductsFilter';
import { EmptyInventory } from '../exception/EmptyInventory';
import { findAllProducts, updateProduct, deleteProduct } from '../api/Products.js'
import { BarcodeComponent } from './BarcodeComponent.jsx';
import { formatToCLP } from '../utils/FormatToCLP.JS';


export const Inventory = () => {


  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsEnabled, setProductsEnabled] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  useEffect(() => {

    const fetchFindAllProducts = async () => {

      try {

        const res = await findAllProducts();

        if (res.data && res.data.length > 0) {

          setProductos(res.data);
          setProductsEnabled(true);

        } else {
          setProductsEnabled(false);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProductsEnabled(false);
      }

    }

    fetchFindAllProducts();

  }, []);



  // Función para abrir el modal con los datos del producto
  const handleEditClick = (producto) => {
    setProductoEditando({ ...producto });
    setIsModalOpen(true);
  };

  // Función para guardar cambios (Simulado)
  const handleSave = async (e) => {
    e.preventDefault();

    const formData = { ...productoEditando };
    const code = formData.code;

    try {

      const res = await updateProduct(code, formData);
      setProductos(prev =>
        prev.map(p =>
          p.id == productoEditando.id ? { ...productoEditando } : p
        )
      );

    } catch (error) {
      console.log("Error al actualizar: ", error)
    }

    setIsModalOpen(false);
  };

  // Función para eliminar
  const handleDelete = async (code) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {

        const res = await deleteProduct(code)
        setProductos(prev => prev.filter(p => p.code != code));

        if (productos.length === 1) {
          setProductsEnabled(false);
        }

      } catch (error) {
        alert("Error al eliminar el producto: ", error)
      }
    }
  };

  return (
    <>
      <div className="inventory-container">
        <header className="inventory-header">
          <h1>Inventario</h1>
        </header>
        <div className="table-wrapper">
          {productsEnabled ? (
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                  <th>Barras</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (

                  <tr key={p.id}>

                    <td>{index + 1}</td>
                    <td>{p.nombre}</td>
                    <td><span className="badge">{p.categoria}</span></td>
                    <td>{formatToCLP(p.precio)}</td>
                    <td>{p.stock}</td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn-edit" onClick={() => handleEditClick(p)}>Editar</button>
                        <button className="btn-delete" onClick={() => handleDelete(p.code)}>Eliminar</button>
                      </div>
                    </td>
                    <td>
                      <div className="barcode-cell">
                        <BarcodeComponent value={p.code} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyInventory />
          )}
        </div>

        {/* MODAL DE EDICIÓN */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Producto</h2>
              <form onSubmit={handleSave}>
                <label>Nombre:</label>
                <input
                  type="text"
                  value={productoEditando.nombre}
                  onChange={(e) => setProductoEditando({ ...productoEditando, nombre: e.target.value })}
                />

                <label>Categoría:</label>
                <select
                  name="categoria"
                  value={productoEditando.categoria}
                  onChange={(e) => setProductoEditando({ ...productoEditando, categoria: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Electrónica">Electrónica</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Jugueteria">Jugueteria</option>
                  <option value="Peluqueria">Peluqueria</option>
                  <option value="Mascotas">Mascotas</option>
                  <option value="Pasteleria">Pasteleria</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Escolares">Escolares</option>
                </select>

                <div className="form-row">
                  <div>
                    <label>Precio:</label>
                    <input
                      type="number"
                      value={productoEditando.precio}
                      onChange={(e) => {
                        const val = e.target.value
                        setProductoEditando({ ...productoEditando, precio: parseFloat(val) })
                      }}
                    />
                  </div>
                  <div>
                    <label>Stock:</label>
                    <input
                      type="number"
                      value={productoEditando.stock}
                      onChange={(e) => {
                        const val = e.target.value
                        setProductoEditando({ ...productoEditando, stock: parseInt(val) })
                      }}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn-save">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <ProductsFilter productos={productos} />
    </>
  );
};
