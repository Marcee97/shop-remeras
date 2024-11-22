import { useEffect, useState, useRef, useContext } from "react";
import "../style/modal.scss";
import ElContexto from "../context/ProductContext.jsx";
import client from "../api/axios.js";
import { z } from "zod";
export const Modal = () => {
  const { productoSeleccionado } = useContext(ElContexto);

  const [email, setEmail] = useState("");
  const [calle, setCalle] = useState("");
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
  const [openCloseFormEnvio, setOpenCloseFormEnvio] = useState(false);

  const tallesDisponibles = ["S", "XL", "XXL"];
  const refButtonMulti = useRef(null);
  useEffect(() => {
    if (selectTalle !== "inicial") {
      const buttonMulti = refButtonMulti.current;
      buttonMulti.textContent = "Completar Compra";
      buttonMulti.classList.add("activate");
      buttonMulti.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectTalle]);

  const refFormDataEnvio = useRef(null);
  const refNombreFormEnvio = useRef(null);

  const despliegoFormEnvio = () => {
    console.log("lionel");
    const buttonMulti = refButtonMulti.current;
    if (buttonMulti.textContent === "Completar Compra") {
      console.log(openCloseFormEnvio);
      setOpenCloseFormEnvio((prevState) => !prevState);
    }
  };

  useEffect(() => {
    if (openCloseFormEnvio) {
      const formDataEnvio = refFormDataEnvio.current;
      formDataEnvio.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      const inputNombre = refNombreFormEnvio.current;
      inputNombre.focus();
    }, 500);
  }, [openCloseFormEnvio]);

  const userSchema = z.object({
    nombre: z.string().min(3, { message: "El Nombre debe contener al menos 3 letras" }),
    apellido: z.string().min(2, {message: "El Apellido debe contener al menos 2 letras"}),
    localidad: z.string().min(2, {message: "La Localidad debe contenr al menos 2 letras"}),
    calle: z.string().min(2, {message: "La Calle debe contener al menos 2 letras"}),
    numeroDeCalle: z.number().min(2, {message: "El numero de calle debe contener al menos 2 numeros"}),
    codigoPostal: z.number().min(2, {message: "El codigo postal debe contener al menos 2 numeros"})
  });
const [errores, setErrores] = useState([])
  const validateFormEnvio = (event) => {
    event.preventDefault();

    const formData = {
      nombre,
      apellido,
      localidad,
      calle,
      numeroDeCalle: numeroDeCalle ? parseInt(numeroDeCalle, 10) : 0,
      codigoPostal: codigoPostal ? parseInt(codigoPostal, 10) : 0,
    };

    try {
      const validData = userSchema.parse(formData);
      console.log(validData, 'datos validos')
      setErrores([])
    } catch (error) {
      console.log(error.errors);
      setErrores(error.errors)
    }
  };

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
            <strong
              className="form-envio-desplegable-title"
              ref={refButtonMulti}
              onClick={despliegoFormEnvio}
            >
              Seleccioná el talle{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </strong>
            <span className="btn-cripto">&</span>
          </div>

          {openCloseFormEnvio && (
            <div className="cont-form-data-envio" ref={refFormDataEnvio}>
              <h4 className="form-data-title">Datos de envio</h4>
              <p className="form-data-subtitle">
                Usaremos esta info para hacerte llegar el envio.
              </p>
              {errores.length > 0 && errores.map((item, index) => (
                <p key={index} className="message-errors">{item.message}</p>
              ))}
              
              <input
                type="text"
                placeholder="Nombre"
                className="input-form-data-envio"
                onChange={(e) => setNombre(e.target.value)}
                ref={refNombreFormEnvio}
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
                onChange={(e) => setCalle(e.target.value)}
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
              <button
                className="btn-form-data-envio"
                onClick={validateFormEnvio}
              >
                Aceptar
              </button>
            </div>
          )}
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
        </div>
        {/*----- Seccion de Data De envio y pago ----*/}
      </div>
    </section>
  );
};
