
import { useInventario } from "../context/InventarioContext";

export default function DetalleProducto({ id }) {
  const { productos, agregarAlCarrito } = useInventario();

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return <p>Artículo no encontrado</p>;
  }

  return (
    <>
      <h2>Detalle del artículo</h2>

      <p>Nombre: {producto.nombre}</p>
      <p>Marca: {producto.marca}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Stock disponible: {producto.stock}</p>

      <button
        className="btn btn-success"
        disabled={producto.stock === 0}
        onClick={() => agregarAlCarrito(producto.id)}
      >
        Agregar al carrito
      </button>
    </>
  );
}
