import { useContext, useEffect, useRef, useState } from "react";
import "../css/components/menuslide.css";
import ElContexto from "../context/ProductContext";
export const MenuSlide = ({ openCloseSlide }) => {
  const refMenuSlide = useRef(null);
  const [closeSlide, setCloseSlide] = useState(true);

  const { openCloseMenuSlide, setOpenCloseMenuSlide } = useContext(ElContexto);

  const [opcioSeleccionada, setOpcioSeleccionada] = useState(null);

  const renderOpcion = (opcion) => {
    setOpcioSeleccionada(opcioSeleccionada === opcion ? null : opcion);
  };

  return (
    <section className="menuslide">
      <div
        className={
          openCloseMenuSlide
            ? "cont-menu-opciones-slide"
            : "cont-menu-opciones-slide slide-activo"
        }
      >
        <div className="cont-icon-close">
          <span
            className="material-symbols-outlined icon-close"
            onClick={() => setOpenCloseMenuSlide((prevState) => !prevState)}
          >
            close
          </span>
        </div>
        <h5 onClick={() => renderOpcion(1)}>
          Sobre Nosotros{" "}
          <span
            className={
              opcioSeleccionada === 1
                ? "material-symbols-outlined arrow-rotate"
                : "material-symbols-outlined"
            }
          >
            chevron_right
          </span>
        </h5>
        <div className={`contenido ${opcioSeleccionada === 1 ? "activo" : ""}`}>
          <p>No contamos con un local fisico</p>
        </div>
        <h5 onClick={() => renderOpcion(2)}>
          Sorteos{" "}
          <span
            className={
              opcioSeleccionada === 2
                ? "material-symbols-outlined arrow-rotate"
                : "material-symbols-outlined"
            }
          >
            chevron_right
          </span>
        </h5>
        <div className={`contenido ${opcioSeleccionada === 2 ? "activo" : ""}`}>
          <p>Info sobre Sorteos</p>
        </div>
        <h5 onClick={() => renderOpcion(3)}>
          Contacto{" "}
          <span
            className={
              opcioSeleccionada === 3
                ? "material-symbols-outlined arrow-rotate"
                : "material-symbols-outlined"
            }
          >
            chevron_right
          </span>
        </h5>
        <div className={`contenido ${opcioSeleccionada === 3 ? "activo" : ""}`}>
          <p>
            <span>WhatsApp:</span> 3385-***-****
          </p>
          <p>
            <span>Email:</span> shop@gmail.com
          </p>
        </div>
        <h5 onClick={() => renderOpcion(4)}>
          Como comprar{" "}
          <span
            className={
              opcioSeleccionada === 4
                ? "material-symbols-outlined arrow-rotate"
                : "material-symbols-outlined"
            }
          >
            chevron_right
          </span>
        </h5>
        <div className={`contenido ${opcioSeleccionada === 4 ? "activo" : ""}`}>
          <p>
            {" "}
            Usamos MercadoPago para manejar los pagos de forma segura. Al
            presionar el botón de pago, serás redirigido a MercadoPago, donde
            podrás elegir el método de pago que prefieras: débito, crédito o
            dinero disponible.
          </p>
        </div>
      </div>
    </section>
  );
};
