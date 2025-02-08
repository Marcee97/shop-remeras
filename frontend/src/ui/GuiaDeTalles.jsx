import { useContext, useEffect, useState, useRef } from "react";
import ElContexto from "../context/ProductContext";
import "../css/components/guiadetalles.css";

export const GuiaDeTalles = () => {
  const {
    productoSeleccionado,
    setPreferenceId,
    openCloseGuiaDeTalles,
    setOpenCloseGuiaDeTalles,
  } = useContext(ElContexto);
  const [guiaSeleccionada, setGuiaSeleccionada] = useState("S");
  const refMedidas = useRef([]);
  const talles = ["S", "XL", "XXL"];

  const medidasPorTalle = {
    S: { cuello: 11, alto: 73, manga: 8, ancho: 30 },
    XL: { cuello: 16, alto: 85, manga: 12, ancho: 35 },
    XXL: { cuello: 20, alto: 90, manga: 12, ancho: 40 },
  };
  const medidas = medidasPorTalle[guiaSeleccionada];

  const transformArray = productoSeleccionado.map((rows) => ({
    ...rows,
    imagenes: rows.imagenes.split(","),
    talles: rows.talles.split(",").map((talle) => talle.toUpperCase()),
  }));

  useEffect(() => {
   

    refMedidas.current.forEach((medida) => {
      if (medida) {
        medida.classList.remove("activate-guia");
        setTimeout(() => {
          medida.classList.add("activate-guia");
        }, 10);
      }
    });
  }, [guiaSeleccionada]);

  return (
    <section className={openCloseGuiaDeTalles ? "guia-de-talles" : "slide"}>
      <div className="section-guia-de-talles">
        {transformArray.map((item, index) => (
          <div className="cont-cuadro-img" key={index}>
            <div className="medidas-cuadro">
              <p className="medida-cuello" ref={(el) => (refMedidas.current[0] = el)}>
                Cuello <br /> {medidas.cuello}cm
              </p>

              <p className="medida-alto" ref={(el) => (refMedidas.current[1] = el)}>
                Alto <br /> {medidas.alto}cm
              </p>
              <p className="medida-manga" ref={(el) => (refMedidas.current[2] = el)}>
                Manga <br /> {medidas.manga}cm
              </p>

              <div className="cuadro-img">
                <span className="cuello"></span>
                <span className="manga"></span>
                <img
                  src={item.imagenes[0]}
                  alt="remera en seccion de talles"
                  className="img-remera-seccion-de-talles"
                />
                <span className="ancho-remera"></span>
              </div>
              <p className="medida-de-ancho" ref={(el) => (refMedidas.current[3] = el)}>Ancho {medidas.ancho}cm</p>
            </div>
            <div className="guia-talles-control-de-talles">
              <h6>Ver medidas</h6>
              <div className="cont-de-botones">
                {transformArray.map((producto, index) => (
                  <div key={index}>
                    {producto.talles.map((talle, idx) => (
                      <button
                        className={`btn-talles ${
                          guiaSeleccionada === talle ? "" : "activo-guia"
                        }`}
                        key={idx}
                        onClick={() => setGuiaSeleccionada(talle)}
                      >
                        {talle}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <button
                className="btn-back"
                onClick={() =>
                  setOpenCloseGuiaDeTalles((prevState) => !prevState)
                }
              >
                Volver
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
