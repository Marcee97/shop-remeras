import React from "react";
import { useContext } from "react";
import ElContexto from "../context/ProductContext";
import "../css/components/formpayment.css"
export const FormPayment = () => {

  const {productoSeleccionado} = useContext(ElContexto)
  console.log(productoSeleccionado[0])


  const arrayImagenes = productoSeleccionado.map((rows) => ({
    ...rows,
    imagenes: rows.imagenes.split(","),
  }));
  return (
    <section className="formpayment">
      <div className="cont-formpayment">
        <h4>Pagar</h4>
        <p>{productoSeleccionado[0].nombre}</p>
        <p>{productoSeleccionado[0].talle}</p>
        {arrayImagenes.map((item, index) => (
          <div className="formpayment-detalle-articulo">

        <img src={item.imagenes[0]} alt="foto producto" key={index} className="img-formpayment" />
          </div>
        ))}
        
      </div>
    </section>
  );
};
