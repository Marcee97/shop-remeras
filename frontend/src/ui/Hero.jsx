import { useEffect, useRef } from "react";

import "../css/components/hero.css";
import ElContexto from "../context/ProductContext";
import { useContext } from "react";
export const Hero = () => {
  const { setBtnVerTodo, verTodo } = useContext(ElContexto);

  const refContCarrousel = useRef(null);

  let i = 0;
  const carrousel = () => {
    i++;
    const carrousel = refContCarrousel.current;
    if (i < 3) {
      let resultado = i * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
    } else {
      i = 0;
      let resultado = i * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
    }
  };
  useEffect(()=> {

    
    const intervalCarrousel = setInterval(()=> {
      carrousel()
    }, 4000)

    return ()=> {
      clearInterval(intervalCarrousel)
    }
  }, [])

  return (
    <section className="hero">
      <div className="cont-hero">
        <div className="carrousel">
          <div className="cont-carrousel activo" ref={refContCarrousel}>
            <img
              src="\public\img\portada\portada01.jpg"
              alt="remera"
              className="img-carrousel"
            />{" "}
            <img
              src="\public\img\portada\portada1.jpg"
              alt="remera"
              className="img-carrousel"
            />{" "}
            <img
              src="\public\img\portada\portada2.jpg"
              alt="remera"
              className="img-carrousel"
            />
          </div>
        <div onClick={carrousel} className="cont-btn-portada">
          <button className="btn-portada"></button>
          <button className="btn-portada"></button>
          <button className="btn-portada"></button>
        </div>
        </div>
        {/*<div className="texto-hero">
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
        </div>*/}
      </div>
      <div className="encabezado-shop"></div>
    </section>
  );
};
