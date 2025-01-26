import { useEffect, useRef, useState } from "react";

import "../css/components/hero.css";
import ElContexto from "../context/ProductContext";
import { useContext } from "react";
export const Hero = () => {
  const { setBtnVerTodo, verTodo } = useContext(ElContexto);

  const refContCarrousel = useRef(null);

  const [btns, setBtns] = useState(0)

  useEffect(()=> {

    const carrousel = refContCarrousel.current;
    if (btns < 3) {
      let resultado = btns * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
      
    } else {
      setBtns(0)
      let resultado = btns * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
    }
  }, [btns])
 
  useEffect(()=> {
    const intervalCarrousel = setInterval(()=> {
      setBtns(prevState => prevState + 1)
    }, 6000)

    return ()=> {
      clearInterval(intervalCarrousel)
    }
  }, [])

  return (
    <section className="hero">
      
      <div className="cont-hero">
      <div className="nombre-marca-portada">
    <h2 className="titulo-portada">E-Commerce</h2>
      </div>
        <div className="carrousel">
        
          <div className="cont-carrousel" ref={refContCarrousel}>
            <img
              src="\img\portada\portada01.jpg"
              alt="remera"
              className="img-carrousel"
            />{" "}
            <img
              src="\img\portada\portada1.jpg"
              alt="remera"
              className="img-carrousel"
            />{" "}
            <img
              src="\img\portada\portada2.jpg"
              alt="remera"
              className="img-carrousel"
            />
          </div>
        <div className="cont-btn-portada">
          <button className={btns === 0 ? "btn-activo" : "btn-portada"}></button>
          <button className={btns === 1 ? "btn-activo" : "btn-portada"}></button>
          <button className={btns === 2 ? "btn-activo" : "btn-portada"}></button>
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
