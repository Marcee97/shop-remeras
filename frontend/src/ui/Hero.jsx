import { useEffect, useRef, useState } from "react";

import "../css/components/hero.css";
import ElContexto from "../context/ProductContext";
import { useContext } from "react";
export const Hero = () => {
  const { setBtnVerTodo, verTodo } = useContext(ElContexto);

  const refContCarrousel = useRef(null);

  const [btns, setBtns] = useState(0);

  useEffect(() => {
    const carrousel = refContCarrousel.current;
    if (btns < 3) {
      let resultado = btns * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
    } else {
      setBtns(0);
      let resultado = btns * -33.3;
      carrousel.style.transform = `translateX(${resultado}%)`;
    }
  }, [btns]);

  useEffect(() => {
    const intervalCarrousel = setInterval(() => {
      setBtns((prevState) => prevState + 1);
    }, 6000);

    return () => {
      clearInterval(intervalCarrousel);
    };
  }, []);

  return (
    <section className="hero">
      <div className="cont-hero">
        <div className="nombre-marca-portada">
          <h2 className="titulo-portada">Polarys</h2>
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
        </div>
      </div>
      <div className="encabezado-shop"></div>
      <div className="cont-btn-portada">
        <div className={btns === 0 ? "btn-activo" : "btn-portada"}></div>
        <div className={btns === 1 ? "btn-activo" : "btn-portada"}></div>
        <div className={btns === 2 ? "btn-activo" : "btn-portada"}></div>
      </div>
    </section>
  );
};
