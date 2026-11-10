
import { useState } from "react";
import { useInventario } from "../context/InventarioContext";

export default function AgregarProducto({ volver }) {
  const { agregarProducto } = useInventario();

  const [nuevo, setNuevo] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    stock: ""
  });

  const guardar = (e) => {
    e.preventDefault();

    if (
      !nuevo.nombre.trim() ||
      !nuevo.marca.trim() ||
      !nuevo.categoria.trim() ||
      Number(nuevo.precio) <= 0 ||
      !Number.isInteger(Number(nuevo.stock)) ||
      Number(nuevo.stock) < 0
    ) {
      alert("Ingresa datos válidos");
      return;
    }

    agregarProducto(nuevo);
    volver();
  };

  return (
    <>
      <h2>Agregar artículo</h2>

      <form onSubmit={guardar}>
        {["nombre", "marca", "categoria", "precio", "stock"].map(campo => (
          <div className="mb-3" key={campo}>
            <label className="form-label">{campo}</label>
            <input
              className="form-control"
              type={["precio", "stock"].includes(campo) ? "number" : "text"}
              min={campo === "precio" ? "1" : campo === "stock" ? "0" : undefined}
              step={campo === "stock" ? "1" : undefined}
              required
              value={nuevo[campo]}
              onChange={e => setNuevo({
                ...nuevo,
                [campo]: e.target.value
              })}
            />
          </div>
        ))}

        <button className="btn btn-success">
          Guardar artículo
        </button>
      </form>
    </>
  );
}
