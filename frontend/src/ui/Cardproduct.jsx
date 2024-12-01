import "../style/cardproduct.scss";
import client from "../api/axios.js";
import { useState, useEffect } from "react";
import { useContext } from "react";
import elContexto from "../context/ProductContext.jsx";
import { useNavigate } from "react-router-dom";

export const Cardproduct = () => {
  const navigate = useNavigate();
  const { productos, setProductos, setproductoSeleccionado } =
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
    <section className="cardproduct">
      <div className="section-from-articles">
        {productos.map((items, index) => (
          <div className="cont-article">
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
              <p>{items.nombre}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};
