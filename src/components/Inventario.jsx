
import { useState } from "react";
import { useInventario } from "../context/InventarioContext";

export default function Inventario({ verDetalle }) {
  const { productos } = useInventario();
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [...new Set(productos.map(p => p.categoria))];

  const filtrados = categoria === "Todas"
    ? productos
    : productos.filter(p => p.categoria === categoria);

  return (
    <>
      <h2>Inventario</h2>

      <select
        className="form-select mb-3"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      >
        <option value="Todas">Todas las categorías</option>
        {categorias.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.marca}</td>
                <td>{p.categoria}</td>
                <td>${p.precio}</td>
                <td>{p.stock}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => verDetalle(p.id)}
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
