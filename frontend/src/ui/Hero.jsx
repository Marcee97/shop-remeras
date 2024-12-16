import { useRef } from "react";

import "../css/components/hero.css";
import ElContexto from "../context/ProductContext";
import { useContext } from "react";
export const Hero = () => {

const {refCatalogo} = useContext(ElContexto)

const btnVerTodo = ()=> {


if(refCatalogo.current){
  console.log('lionel messi')
  refCatalogo.current.focus()
}

}







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
          <h1 className="nombre-de-la-marca">NotSocial</h1>
        </div>
        <div className="cont-marca-btn" onClick={btnVerTodo}>
          <p className="btn-catalogo">
            Ver todo{" "}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </p>
        </div>
      </div>
      <div className="encabezado-shop">

        <h5>aca deberia haber algo mas</h5>
      </div>
    </section>
  );
};
