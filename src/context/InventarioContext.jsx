
import { createContext, useContext, useState } from "react";

const InventarioContext = createContext();

export function InventarioProvider({ children }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Leche", marca: "Colun", categoria: "Lácteos", precio: 1200, stock: 20 },
    { id: 2, nombre: "Arroz", marca: "Tucapel", categoria: "Abarrotes", precio: 1800, stock: 30 },
    { id: 3, nombre: "Bebida", marca: "Coca-Cola", categoria: "Bebidas", precio: 2500, stock: 15 }
  ]);

  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setProductos(prev => [
      ...prev,
      { ...producto, id: Date.now(), stock: Number(producto.stock), precio: Number(producto.precio) }
    ]);
  };

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto || producto.stock <= 0) return;

    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, stock: p.stock - 1 } : p
    ));

    setCarrito(prev => {
      const existe = prev.find(p => p.id === id);
      if (existe) {
        return prev.map(p =>
          p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const disminuirCantidad = (id) => {
    const producto = carrito.find(p => p.id === id);
    if (!producto) return;

    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, stock: p.stock + 1 } : p
    ));

    setCarrito(prev => prev
      .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
      .filter(p => p.cantidad > 0)
    );
  };

  return (
    <InventarioContext.Provider value={{
      productos,
      carrito,
      agregarProducto,
      agregarAlCarrito,
      disminuirCantidad
    }}>
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  return useContext(InventarioContext);
}
