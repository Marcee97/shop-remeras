import client from "../api/axios.js";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import elContexto from "../context/ProductContext.jsx";
import "../css/components/cardproduct.css"
export const Cardproduct = () => {
 
  const { productos, setProductos, setproductoSeleccionado,productoSeleccionado,refCatalogo,setInfoProductoSeleccionado, peticionProductsModal } =
    useContext(elContexto);


  return (
    <section className="cardproduct" ref={refCatalogo} >
      <h4 className="cardproduct-subtitle">Ultimos Lanzamientos</h4>
      <div className="section-from-articles">
        {productos.map((items, index) => (
          <div className="cont-article" onClick={()=> peticionProductsModal(index + 1)} key={index}>
            <header className="article-header">
              <img
                src={items.imagen}
                className="img-from-article"
                alt="imagen de producto en el catalogo de muestra"
              />
              <strong className="article-precio">$ {items.precio}</strong>
            </header>
            <article className="article" key={index}>
              <p ref={refCatalogo}>{items.nombre}</p>
          <h6>Disponibles ({items.cantidad})</h6>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
