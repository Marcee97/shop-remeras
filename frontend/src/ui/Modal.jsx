import { useEffect, useState, useRef, useContext } from "react";
import "../style/modal.scss";

import axios from "axios";
import ElContexto from "../context/ProductContext.jsx";

export const Modal = () => {
  const { productoSeleccionado } = useContext(ElContexto);

  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numeroDeCalle, setNumeroDeCalle] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");

  const refImageCarrousel = useRef(null);

  let i = 0;

  const carrousel = (dir) => {
    const carrousel = refImageCarrousel.current;
    const totalScroll = carrousel.children.length;

    if (dir === "mas") {
      i = (i + 1) % totalScroll;
    } else if (dir === "menos") {
      i = (i - 1 + totalScroll) % totalScroll;
    }

    const resultado = i * 100;
    carrousel.style.transform = `translateX(-${resultado}%)`;
  };
  const transformArray = productoSeleccionado.map((row) => ({
    ...row,
    imagenes: row.imagenes.split(","),
  }));

  const [selectTalle, setSelectTalle] = useState("inicial");
  const [formEnvio, setFormEnvio] = useState(false);

  const tallesDisponibles = ["S", "XL", "XXL"];
const refButtonMulti = useRef(null)
  useEffect(()=> {
    if(selectTalle !== 'inicial'){

      const buttonMulti = refButtonMulti.current
      buttonMulti.textContent = 'Completar Compra'
      console.log('el cambio de teto')
    }
  }, [selectTalle])

  return (
    <section className="modal">
      <div className="modal-cardproduct">
        {transformArray.map((items, index) => (
          <div className="cont-modal-product" key={index}>
            <div className="modal-carrousel" key={index}>
              <div className="cont-img-carrousel" ref={refImageCarrousel}>
                {items.imagenes.map((imagen, imgIndex) => (
                  <img src={imagen} alt="fotos productos" key={imgIndex} />
                ))}
              </div>
              <div className="cont-btns-carrousel">
                <span
                  className="material-symbols-outlined"
                  onClick={() => carrousel("menos")}
                >
                  chevron_left
                </span>
                <span
                  className="material-symbols-outlined"
                  onClick={() => carrousel("mas")}
                >
                  chevron_right
                </span>
              </div>
            </div>
            <h5>{items.nombre}</h5>
            <h6 className="precio-modal-product">
              $ <span>{items.precio}</span>
            </h6>
            <h6 className="preferencias-modal-product-disponibilidad">
              Disponibles: {items.cantidad}
            </h6>
          </div>
        ))}
        <div className="cont-preferencias-modal-product">
          <div className="section-botones-talles">
            <header className="header-seleccionar-talle">
              <strong className="talle-title">Talles</strong>

              <p className="guia-talles">Guia de talles</p>
            </header>

            <div className="cont-botones-talles">
              {tallesDisponibles.map((talle) => (
                <button
                  key={talle}
                  className={`btn-talle ${
                    selectTalle === talle ? "btn-talle-activo" : ""
                  }`}
                  onClick={() => setSelectTalle(talle)}
                >
                  {talle.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/*----- Formulario Para Los Envios -----*/}

          <div className="cont-form-envio-desplegable">
            <strong className="form-envio-desplegable-title" ref={refButtonMulti}>
              Seleccioná el talle{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </strong>
            <span className="btn-cripto">&</span>
          </div>
          <div className="cont-info-adicional">
            <div className="info-adicional">
              <span className="material-symbols-outlined">local_shipping</span>
              <p>El envio ya esta incluido en el precio final</p>
            </div>
            <div className="info-adicional">
              <span className="material-symbols-outlined camion-ventas">
                local_shipping
              </span>
              <p>
                {" "}
                Devoluciones Gratis ¿No es tu talle? Podes devolverlo en un
                plazo de dos dias
              </p>
            </div>
          </div>
          <div className="cont-form-data-envio">
            <input
              type="text"
              placeholder="Nombre"
              className="input-form-data-envio"
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              onChange={(e) => setApellido(e.target.value)}
              className="input-form-data-envio"
            />
            <input
              type="text"
              placeholder="Provincia"
              onChange={(e) => setProvincia(e.target.value)}
              className="input-form-data-envio"
            />
            <input
              type="text"
              placeholder="Localidad"
              onChange={(e) => setLocalidad(e.target.value)}
              className="input-form-data-envio"
            />
            <input
              type="text"
              placeholder="Calle"
              onChange={(e) => setDireccion(e.target.value)}
              className="input-form-data-envio"
            />
            <input
              type="number"
              onChange={(e) => setNumeroDeCalle(e.target.value)}
              placeholder="Numero"
              className="input-form-data-envio"
            />
            <input
              type="number"
              placeholder="Codigo Postal"
              onChange={(e) => setCodigoPostal(e.target.value)}
              className="input-form-data-envio"
            />
            <button className="btn-form-data-envio">Aceptar</button>
          </div>
        </div>
        {/*----- Seccion de Data De envio y pago ----*/}
      </div>
    </section>
  );
};
