import "../style/cardproduct.scss";
import client from "../api/axios.js";
import { useState, useEffect } from "react";
import { useContext } from "react";
import elContexto from "../context/ProductContext.jsx";
import { useNavigate } from "react-router-dom";

export const Cardproduct = () => {
  const navigate = useNavigate()
  const { productos, setProductos, setproductoSeleccionado } = useContext(elContexto);
  


const sendProductoModal = (producto)=> {
setproductoSeleccionado(producto)
navigate('/modal')
}



  return (
    <section className="cardproduct">
      <img
        src="https://i.pinimg.com/474x/4d/f0/e5/4df0e5099af1430f7edde806b8cc1a3e.jpg"
        alt="background productos"
        className="fondo-products"
      />
      <div className="cont-products">
        {productos.map((items, index) => (
          <div
            key={index}
            className="cuerpo-cardproduct"
            onClick={() => sendProductoModal(items)}
          >
            <div>
              <img
                src={items.imagen}
                alt="imagen de producto"
                className="img-cardproduct"
              />
            </div>
            <strong className="precio-cardproduct">
              <span>${items.precio}</span>
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
};
