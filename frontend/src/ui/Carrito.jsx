import { useContext, useState } from "react";
import "../css/components/carrito.css";
import ElContexto from "../context/ProductContext";

export const Carrito = () => {
  const {
    openCloseCarrito,
    setOpenCloseCarrito,
    productoSeleccionado,
    setProductoCarrito,
    productoCarrito,
    totalCarrito,
    setIdProductosCarrito,
    idProductosCarrito,
    compraDesdeCarrito,
    setCompraDesdeCarrito,
  } = useContext(ElContexto);

  const eliminarProducto = (id) => {
    setProductoCarrito(
      productoCarrito.filter(
        (productoParaEliminar) => productoParaEliminar.id !== id
      )
    );
    setIdProductosCarrito(
      idProductosCarrito.filter((idParaEliminar) => idParaEliminar !== id)
    );
  };

  const btnComprar = () => {
    setCompraDesdeCarrito((prevState) => !prevState)
    setOpenCloseCarrito((prevState) => !prevState)

    setTimeout(()=> {
    setCompraDesdeCarrito((prevState) => !prevState)

    }, 2100)
  };

  return (
    <section
      className={
        openCloseCarrito ? "carrito-compras" : "carrito-compras activo"
      }
    >
      <span
        className="material-symbols-outlined carrito-icon-close"
        onClick={() => setOpenCloseCarrito((prevState) => !prevState)}
      >
        close
      </span>
      <div className="cont-carrito">
        {productoCarrito.length === 0 ? (
          <p className="no-productos-carrito">
            No tienes productos en el Carrito
          </p>
        ) : (
          productoCarrito.map((items, index) => (
            <article className="carrito-article" key={index}>
              <img
                src={items.imagenes[0]}
                alt="producto ya en el carrito"
                className="img-cont-carrito"
              />
              <div>
                <p>{items.nombre}</p>
                <strong>{items.precio}</strong>
              </div>
              <div className="cont-buttons">
                <span
                  className="material-symbols-outlined"
                  onClick={() => eliminarProducto(items.id)}
                >
                  delete
                </span>
                <button className="btn-comprar" onClick={btnComprar}>Comprar</button>
              </div>
            </article>
          ))
        )}
      </div>

      <div className="cont-resultado-carrito">
        <p>Total:{totalCarrito}</p>
        <button className="btn-comprar-todo">Comprar todo</button>
      </div>
    </section>
  );
};
