import { useEffect, useState, useRef, useContext } from "react";
import ElContexto from "../context/ProductContext.jsx";
import client from "../api/axios.js";
import { set, z } from "zod";
import { Footer } from "./Footer.jsx";
import "../css/components/modal.css";
import { GuiaDeTalles } from "./GuiaDeTalles.jsx";
import { WalletComponent } from "../ui/WalletComponent.jsx";
import { NavBar } from "./NavBar.jsx";
import { FormEnvio } from "./FormEnvio.jsx";
import { FormPayment } from "./FormPayment.jsx";
import { Carrito } from "./Carrito.jsx";
export const Modal = () => {
  const {
    productos,
    setProductos,
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
    focusFormEnvio,
    setSelectTalle,
    selectTalle,
    addCarrito,
    idproducto,
    idProductosCarrito,
    setProductoCarrito,
    productoCarrito
  } = useContext(ElContexto);
  const [agregadoCarrito, setAgregadoCarrito] = useState(false);
  useEffect(() => {
    console.log(productoCarrito)
    if (idProductosCarrito.includes(productoSeleccionado[0].id)) {
      console.log("ya esta agegado");
      setAgregadoCarrito(true);

    } else {
      console.log("no esta agregado");
      setAgregadoCarrito(false);
    }
  }, [idProductosCarrito, productoSeleccionado]);

const verificarProductoEnCarrito = ()=> {
  if(productoCarrito.includes(productoSeleccionado[0].id)){
    
    setProductoCarrito(prevCarrito => prevCarrito.filter(producto => producto.id !== productoSeleccionado[0].id));


  }


}

//Aca quede sin terminar la funcion para eliminar el producto del carrito desde el button del corazon,o temabn preguntar si estas seguro si deseas eliminarlo


  const [isLoading, setIsLoading] = useState(false);
  const [loadingFront, setLoadingFront] = useState(false);
  const [tallesDisponibles, setTallesDisponibles] = useState([]);

  useEffect(() => {
    const talles = productoSeleccionado[0].talles.split(",");
    console.log(talles);
    setTallesDisponibles(talles);
  }, []);

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
      setOpenCloseFormEnvio("open");
      setTimeout(() => {
        sliceFormEnvio();
      }, 400);
      setTimeout(() => {
        focusFormEnvio();
      }, 600);
    }
  };

  const refContMethodPay = useRef(null);
  const [errores, setErrores] = useState([]);
  const [formDataCompleto, setFormDataCompleto] = useState(false);
  const [formDataAnimation, setFormDataAnimation] = useState(false);
  const refSubtitleFormEnvio = useRef(null);
  const refTituloFormEnvio = useRef(null);

  //-------------------  COMIENZA EL JSX  -----------------------------------------------------------------
  return (
    <>
      <NavBar />
      <Carrito />
      <section className="modal">
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
                <strong className="talle-title">
                  {tallesDisponibles.length === 1
                    ? "Unico Talle Disponible:"
                    : "Talles:"}
                </strong>
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
              >
                <div className="btn-alternate"  onClick={despliegoFormEnvio} ref={refBtnGuiaDesplegable}>
                  <strong ref={refButtonMultiText} >
                    Seleccioná el talle{" "}
                  </strong>
                  <span
                    className="material-symbols-outlined prueba-flecha"
                    ref={refArrowGuia}
                  >
                    arrow_forward
                  </span>
                </div>

                <p className="cont-btn-cripto" onClick={addCarrito}>
                  {agregadoCarrito ? (
                    <i className="fa-solid fa-heart btn-add-carrito-active"></i>
                  ) : (
                    <i className="fa-regular fa-heart btn-add-carrito"></i>
                  )}
                </p>
              </div>
            </div>
            <FormEnvio />
            <FormPayment />
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
