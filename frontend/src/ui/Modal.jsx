import { useEffect, useState, useRef, useContext } from "react";
import ElContexto from "../context/ProductContext.jsx";
import client from "../api/axios.js";
import { set, z } from "zod";
import { WalletComponent } from "./WalletComponent.jsx";
import { Footer } from "./Footer.jsx";
import "../css/components/modal.css";
import { GuiaDeTalles } from "./GuiaDeTalles.jsx";
import { NavBar } from "./NavBar.jsx";
import { FormEnvio } from "./FormEnvio.jsx";
export const Modal = () => {
  const {
    productoSeleccionado,
    setPreferenceId,
    setOpenCloseGuiaDeTalles,
    openCloseGuiaDeTalles,
    openCloseSectionPay,
    openInfoMetodoDePago,
    setOpenInfoMetodoDePago,
    setOpenCloseFormEnvio,
    openCloseFormEnvio,
  sliceFormEnvio,
  refNombreFocus,
  focusFormEnvio
  } = useContext(ElContexto);

  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFront, setLoadingFront] = useState(false);
  
  const refFormEnvio = useRef(null);
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

    const resultado = i * 50;
    carrousel.style.transform = `translateX(-${resultado}%)`;
  };

  const transformArray = productoSeleccionado.map((rows) => ({
    ...rows,
    imagenes: rows.imagenes.split(","),
  }));
  const [selectTalle, setSelectTalle] = useState("inicial");

  const tallesDisponibles = ["S", "XL", "XXL"];
  const refButtonMultiText = useRef(null);
  const refArrowGuia = useRef(null);
  const refBtnGuiaDesplegable = useRef(null);
  useEffect(() => {
    if (selectTalle !== "inicial") {
      const buttonMulti = refButtonMultiText.current;
      const arrowGuia = refArrowGuia.current;
      const btnGuiaDesplegable = refBtnGuiaDesplegable.current;
      buttonMulti.textContent = "Completar envio";
      btnGuiaDesplegable.classList.add("activate");
      arrowGuia.classList.add("arrow-rotate");
      buttonMulti.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectTalle]);

  const refFormDataEnvio = useRef(null);
  const refNombreFormEnvio = useRef(null);

  const despliegoFormEnvio = () => {
    const buttonMulti = refButtonMultiText.current;
    if (buttonMulti.textContent === "Completar envio") {
      setOpenCloseFormEnvio((prevState) => !prevState);
      setTimeout(() => {
        sliceFormEnvio()
      }, 400);
      setTimeout(() => {
        focusFormEnvio()
      }, 600);
      
    }

  };


  const refContMethodPay = useRef(null);
  const [errores, setErrores] = useState([]);
  const [formDataCompleto, setFormDataCompleto] = useState(false);
  const [formDataAnimation, setFormDataAnimation] = useState(false);
  const refSubtitleFormEnvio = useRef(null);
  const refTituloFormEnvio = useRef(null);

  //------------- validacion de formulario de envio ---------------
  /*
  const validateFormEnvio = async (event) => {
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
      setErrores([]);

      const unitPrice = productoSeleccionado[0].precio;
      const quantity = productoSeleccionado[0].cantidad;
      const title = productoSeleccionado[0].nombre;

      const response = await client.post("/payment-proccess", {
        unitPrice,
        quantity,
        title,
        nombre,
        apellido,
        provincia,
        localidad,
        calle,
        numeroDeCalle,
        codigoPostal,
        title,
        email,
        selectTalle,
      });
      const { preferenceId } = response.data;
      setPreferenceId(preferenceId);
      const subtitleFormEnvio = refSubtitleFormEnvio.current;
      const tituloFormEnvio = refTituloFormEnvio.current;

     
        setFormDataCompleto((prevState) => !prevState);
        tituloFormEnvio.textContent = "Datos de envio Completo";
      
      setFormDataAnimation((prevData) => !prevData);

      setTimeout(() => {
        setOpenCloseSectionPay((prevState) => !prevState);
      }, 2900);

      const formDataEnvio = refFormDataEnvio.current;

      setTimeout(() => {
        refContMethodPay.current.scrollIntoView({ behavior: "smooth" });
      }, 5200);

      setTimeout(() => {
        setIsLoading((prevState) => !prevState);
      }, 4000);
    } catch (error) {
      setErrores(error.errors);
    }
  };

  const [openInfoMetodoDePago, setOpenInfoMetodoDePago] = useState(true);

  const editFormEnvio = () => {
    setFormDataAnimation((prevState) => !prevState);
    setOpenCloseSectionPay((prevState) => !prevState);
  };
  const refEspacioBtnMercadopago = useRef(null);
  useEffect(() => {
    const espacioBtnMercadopago = refEspacioBtnMercadopago.current;
    setTimeout(() => {
      espacioBtnMercadopago.style.height = "110px";
    }, 1800);
  }, [isLoading]);

  const errorNombre = errores.find(
    (error) => error.path && error.path[0] === "nombre"
  );

  const erroresForm = (fieldError) => {
    const error = errores.find(
      (error) => error.path && error.path[0] === fieldError
    );

    return error ? error.message : null;
  };
*/
  //-------------------  COMIENZA EL JSX  -----------------------------------------------------------------
  return (
    <>
      <section className="modal">
        <NavBar />
        <div className="modal-cardproduct">
          {transformArray.map((items, index) => (
            <div className="cont-modal-product" key={index}>
              <div className="modal-carrousel">
                <div className="cont-img-carrousel" ref={refImageCarrousel}>
                  {items.imagenes.map((imagen, imgIndex) => (
                    <div className="div-img" key={imgIndex}>
                      <img src={imagen} alt="fotos productos" key={imgIndex} />
                    </div>
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
              <GuiaDeTalles />
            </div>
          ))}
          <div
            className={
              openCloseGuiaDeTalles
                ? "cont-preferencias-modal-product openguia"
                : "cont-preferencias-modal-product"
            }
          >
            <div className="section-botones-talles">
              <header className="header-seleccionar-talle">
                <strong className="talle-title">Talles</strong>

                <p
                  className="guia-talles"
                  onClick={() =>
                    setOpenCloseGuiaDeTalles((prevState) => !prevState)
                  }
                >
                  <span className="material-symbols-outlined">
settings_accessibility
</span>
                  Guia de talles
                </p>
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

            <div className="cont-form-envio-desplegable">
              <div
                className="btn-guia-desplegable"
                onClick={despliegoFormEnvio}
                ref={refBtnGuiaDesplegable}
              >
                <strong ref={refButtonMultiText}>Seleccioná el talle</strong>
                <span
                  className="material-symbols-outlined prueba-flecha"
                  ref={refArrowGuia}
                >
                  arrow_forward
                </span>
              </div>
              <p className="btn-cripto">
                <span className="material-symbols-outlined">favorite</span>
              </p>
            </div>

            {/*----- Formulario Para Los Envios -----*/}
            <FormEnvio />


            {/*/
            {openCloseFormEnvio && (
              <div
                className={
                  formDataAnimation
                    ? "cont-form-data-envio completado"
                    : "cont-form-data-envio"
                }
                ref={refFormDataEnvio}
              >
                <h4 className="form-data-title" ref={refTituloFormEnvio}>
                  Datos de envio
                </h4>
                {formDataAnimation && (
                  <button
                    className="btn-editar-form-envio"
                    onClick={editFormEnvio}
                  >
                    Editar
                  </button>
                )}
                <p className="form-data-subtitle" ref={refSubtitleFormEnvio}>
                  Usaremos esta info para hacerte llegar el envio.
                </p>
                <div className="cont-inputs-form-envio-nombres">
                  <h5>Nombre y Apellido</h5>
                  {erroresForm("nombre") && (
                    <p className="message-errors">{erroresForm("nombre")}</p>
                  )}
                  <input
                    type="text"
                    placeholder="Nombre"
                    className={"input-form-data-envio"}
                    onChange={(e) => setNombre(e.target.value)}
                    ref={refNombreFormEnvio}
                    name="nombre"
                  />
                  {erroresForm("apellido") && (
                    <p className="message-errors">{erroresForm("apellido")}</p>
                  )}
                  <input
                    type="text"
                    placeholder="Apellido"
                    className={"input-form-data-envio"}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
                {erroresForm("email") && (
                  <p className="message-errors">{erroresForm("email")}</p>
                )}
                <input
                  type="email"
                  placeholder="alan_turing@example.com"
                  className={"input-form-data-envio"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {erroresForm("provincia") && (
                  <p className="message-errors">{erroresForm("provincia")}</p>
                )}
                <input
                  type="text"
                  placeholder="Provincia"
                  className={"input-form-data-envio"}
                  onChange={(e) => setProvincia(e.target.value)}
                />
                {erroresForm("localidad") && (
                  <p className="message-errors">{erroresForm("localidad")}</p>
                )}
                <input
                  type="text"
                  placeholder="Localidad"
                  className={"input-form-data-envio"}
                  onChange={(e) => setLocalidad(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Calle"
                  className={"input-form-data-envio"}
                  onChange={(e) => setCalle(e.target.value)}
                />
                <input
                  type="number"
                  className={"input-form-data-envio"}
                  onChange={(e) => setNumeroDeCalle(e.target.value)}
                  placeholder="Numero"
                />
                <input
                  type="number"
                  className={"input-form-data-envio"}
                  placeholder="Codigo Postal"
                  onChange={(e) => setCodigoPostal(e.target.value)}
                />
                <button
                  className={"btn-form-data-envio"}
                  onClick={validateFormEnvio}
                >
                  Aceptar
                </button>
              </div>
            )}
                  */}
            {openCloseSectionPay && (
              <div
                className={
                  openCloseSectionPay
                    ? "cont-metodo-de-pago animation-payment"
                    : "cont-metodo-de-pago "
                }
                ref={refContMethodPay}
              >
                <h4 className="title-cont-metodo-de-pago">Finalizar Compra</h4>
                <div className="cont-metodo-de-pago-info">
                  <h5
                    className={
                      openInfoMetodoDePago
                        ? "btn-como-pagar"
                        : "info-active-btn-pagar"
                    }
                    onClick={() =>
                      setOpenInfoMetodoDePago((prevState) => !prevState)
                    }
                  >
                    ¿Como pagar?{" "}
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  </h5>
                  <p
                    className={
                      openInfoMetodoDePago
                        ? "metodo-de-pago-info"
                        : "metodo-de-pago-info info-active"
                    }
                  >
                    Usamos MercadoPago para manejar los pagos de forma segura.
                    Al presionar el botón de pago, serás redirigido a
                    MercadoPago, donde podrás elegir el método de pago que
                    prefieras: débito, crédito o dinero disponible.{" "}
                  </p>
                </div>
                <div className="section-info-payment">
                  <h4 className="title-info-payment">Detalle</h4>
                  {transformArray.map((items, index) => (
                    <div className="cont-info-payment" key={index}>
                      <img
                        src={items.imagenes[0]}
                        alt="img payment"
                        className="img-info-payment"
                      />
                      <div className="cont-detalle-info">
                        <p className="payment-product">{items.nombre}</p>
                        <p>Total: {items.precio}</p>
                        <div className="cont-talle-edit">
                          <p>Talle: {selectTalle}</p>
                          <p className="btn-edit-talle">Editar</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                 
                >
                  <WalletComponent />
                </div>
              </div>
            )}
            <div className="cont-info-adicional">
              <div className="info-adicional">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
                <p>Hacemos envios a todo el pais.</p>
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
      <Footer />
    </>
  );
};
