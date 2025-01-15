import { useRef } from "react";

import "../css/components/hero.css";
import ElContexto from "../context/ProductContext";
import { useContext } from "react";
export const Hero = () => {

const {setBtnVerTodo, verTodo} = useContext(ElContexto)

  return (
    <section className="hero">
      <div className="cont-hero">
        <img
          src="https://i.pinimg.com/736x/79/28/ed/7928edbcd0a355cd87d378afce440d24.jpg"
          alt="remera"
          className="fondo-hero"
        />
        <div className="texto-hero">
          <div className="cube-container">
            <div className="cube">
              <div className="face cara-uno">E-Commerce</div>
              <div className="face cara-dos">Remeras</div>
              <div className="face cara-tres">Online</div>
              <div className="face cara-cuatro">Envios</div>
            </div>
          </div>
        </div>
        <div className="cont-marca-btn" onClick={verTodo}>
          <p className="btn-catalogo">
            Ver todo{" "}<span className="material-symbols-outlined">
arrow_forward
</span>
          </p>
        </div>
      </div>
      <div className="encabezado-shop">

      </div>
    </section>
  );
};
