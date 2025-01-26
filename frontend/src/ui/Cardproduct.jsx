import client from "../api/axios.js";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import elContexto from "../context/ProductContext.jsx";
import { useNavigate } from "react-router-dom";
import "../css/components/cardproduct.css"
export const Cardproduct = () => {
  const navigate = useNavigate();
  const { productos, setProductos, setproductoSeleccionado,productoSeleccionado, btnVerTodo,refCatalogo,setInfoProductoSeleccionado } =
    useContext(elContexto);

  const peticionProductsModal = async (id) => {
    const response = await client.post("/modal-products", {
      id,
    });
    setproductoSeleccionado(response.data);
    
    navigate("/modal");

    console.log(response);
  };

  return (
    <section className="cardproduct" ref={refCatalogo} >
      <h4 className="cardproduct-subtitle">Lo ultimo</h4>
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
          <h6>Disponibles ({items.cantidad})</h6>
              <p ref={refCatalogo}>{items.nombre}</p>
            </article>
          </div>
        ))}
      </div>
      
    </section>
  );
};
