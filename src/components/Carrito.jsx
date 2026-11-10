
import { useInventario } from "../context/InventarioContext";

export default function Carrito() {
  const {
    productos,
    carrito,
    agregarAlCarrito,
    disminuirCantidad
  } = useInventario();

  return (
    <>
      <h2>Carrito de compras</h2>

      {carrito.length === 0 && <p>El carrito está vacío.</p>}

      {carrito.map(p => (
        <div className="card p-3 mb-2" key={p.id}>
          <h5>{p.nombre} - {p.marca}</h5>
          <p>Cantidad: {p.cantidad}</p>

          <div>
            <button
              className="btn btn-success me-2"
              disabled={productos.find(item => item.id === p.id)?.stock === 0}
              onClick={() => agregarAlCarrito(p.id)}
            >
              +
            </button>

            <button
              className="btn btn-danger"
              onClick={() => disminuirCantidad(p.id)}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
