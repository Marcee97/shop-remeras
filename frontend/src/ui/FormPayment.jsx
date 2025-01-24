import React from "react";
import { useContext, useState } from "react";
import ElContexto from "../context/ProductContext";
import "../css/components/formpayment.css";
import { WalletComponent } from "../ui/WalletComponent";
export const FormPayment = () => {
  const { productoSeleccionado, selectTalle } = useContext(ElContexto);

  const [openCloseComoPagar, setOpenCloseComoPagar] = useState(false);
  const arrayImagenes = productoSeleccionado.map((rows) => ({
    ...rows,
    imagenes: rows.imagenes.split(","),
  }));

  return (
    <section className="formpayment">
      <div className="cont-formpayment">
        <h3 className="formpayment-titulo">Pagar</h3>
        <p className="cont-formpayment__precio">
          (${productoSeleccionado[0].precio})
        </p>
        <p className="cont-formpayment__nombre">
          {productoSeleccionado[0].nombre}
        </p>
        <p>{productoSeleccionado[0].talle}</p>
        <strong>{selectTalle}</strong>
        {arrayImagenes.map((item, index) => (
          <img
            src={item.imagenes[0]}
            alt="foto producto"
            className="img-formpayment"
            key={index}
          />
        ))}
        <div className="formpayment-detalles">
          <h3
            className="formpayment-detalles-btn"
            onClick={() => setOpenCloseComoPagar((prevState) => !prevState)}
          >
            ¿Como pagar?
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </h3>
          <article
            className={
              openCloseComoPagar
                ? "formpayment-detalles-texto"
                : "texto-openclose"
            }
          >
            {" "}
            Usamos MercadoPago para manejar los pagos de forma segura. Al
            presionar el botón de pago, serás redirigido a MercadoPago, donde
            podrás elegir el método de pago que prefieras: débito, crédito o
            dinero disponible.
          </article>
        </div>
        <div className="btn-mercadopago">
          <WalletComponent />
        </div>
      </div>
    </section>
  );
};
