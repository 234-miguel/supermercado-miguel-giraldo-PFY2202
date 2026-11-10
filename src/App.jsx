
import { useState } from "react";
import { useInventario } from "./context/InventarioContext";
import Inventario from "./components/Inventario";
import AgregarProducto from "./components/AgregarProducto";
import DetalleProducto from "./components/DetalleProducto";
import Carrito from "./components/Carrito";
import "./App.css";

function App() {
  const [pagina, setPagina] = useState("inventario");
  const [seleccionado, setSeleccionado] = useState(null);
  const { carrito } = useInventario();

  const verDetalle = (id) => {
    setSeleccionado(id);
    setPagina("detalle");
  };

  return (
    <div className="container py-4">
      <h1>Supermercado - Gestión de Inventario</h1>

      <nav className="d-flex gap-2 my-4 flex-wrap">
        <button
          className="btn btn-primary"
          onClick={() => setPagina("inventario")}
        >
          Inventario
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setPagina("agregar")}
        >
          Agregar artículo
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setPagina("carrito")}
        >
          Carrito ({carrito.reduce((total, p) => total + p.cantidad, 0)})
        </button>
      </nav>

      {pagina === "inventario" && (
        <Inventario verDetalle={verDetalle} />
      )}

      {pagina === "agregar" && (
        <AgregarProducto volver={() => setPagina("inventario")} />
      )}

      {pagina === "detalle" && (
        <DetalleProducto id={seleccionado} />
      )}

      {pagina === "carrito" && <Carrito />}
    </div>
  );
}

export default App;
