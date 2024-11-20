import { useEffect, useState, useRef, useContext } from "react";
import "../style/modal.scss";
import { useNavigate } from "react-router-dom";
import { loadMercadoPago } from "@mercadopago/sdk-js";

import axios from "axios";
import ElContexto from "../context/ProductContext.jsx";

export const Modal = () => {
  const { productoSeleccionado } = useContext(ElContexto);

  const [dataRecibida, setDataRecibida] = useState([]);
  const [openClosePagos, setopenClosePagos] = useState(false);
  const [openCloseDataEnvio, setOpenCloseDataEnvio] = useState(false);
  const [estadoPayment, setEstadoPayment] = useState("");
  const [articulo, setArticulo] = useState("");
  const refProducto = useRef(null);
  const refPrecio = useRef(null);
  const refDescripcion = useRef(null);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const backShop = () => {
    navigate("/");
  };

  const [loading, setLoading] = useState(false);
  const [backResponse, setBackResponse] = useState(false);
  const [backResponseStatus, setBackResponseStatus] = useState(false);
  const [backResponseTextStatus, setBackResponseTextStatus] = useState("");
  const [email, setEmail] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");
  const [direccion, setDireccion] = useState("");
  const [numeroDeCalle, setNumeroDeCalle] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [openFormMP, setOpenFormMP] = useState(false);
  const [openFormTarjeta, setOpenFormTarjeta] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("inicial");
  const formEnvioRef = useRef(null);

  const despliegoFormEnvio = (metodo) => {
    setOpenCloseDataEnvio((prevData) => !prevData);
    console.log(infoModals[0].cantidad);
    setTimeout(() => {
      if (formEnvioRef.current) {
        console.log("el useref forms");
        formEnvioRef.current.scrollIntoView({ behavior: "smooth" });
        formEnvioRef.current.focus();
      }
    }, 0);
    console.log(metodo);
    if (metodo === "MP") {
      setPaymentMethod(metodo);

      console.log("el estado de paymentMethod se cambio a MP");
    } else {
      setPaymentMethod(metodo);
    }
  };

  const validateformDataEnvio = async () => {
    if (direccion.length > 3) {
      console.log("direccion correcta");
    } else {
      console.log("la data de envio tiene algun error");
    }
  };

  //TEST-aa57b093-8dbb-4593-bbeb-f016e89d1138

  useEffect(() => {
    const walletMercadoPago = async () => {
      const response = await axios.post(
        "http://localhost:3000/wallet_payment",
        {
          title: "remeras",
          unitPrice: 1221,
          cantidad: 2,
        }
      );
      console.log(response);
      const { preferenceId } = response.data;
      await loadMercadoPago();
      const mp = new window.MercadoPago(
        "TEST-aa57b093-8dbb-4593-bbeb-f016e89d1138"
      );

      mp.bricks().create("wallet", "wallet_container", {
        initialization: {
          preferenceId: preferenceId,
        },
      });
    };
    walletMercadoPago();
  }, []);

  return (
    <section className="modal">
      <section className="modal-cardproduct">
        <p className="btn-back-modal-product" onClick={backShop}>
          <i className="fa-solid fa-arrow-left"></i>Regresar a Shop
        </p>
        <div className="cont-modal-product">
          <img src={productoSeleccionado.imagen} alt="imagen producto modal" />
          <h5 ref={refProducto}>{productoSeleccionado.nombre}</h5>
          <h6 className="precio-modal-product">
            $ <span ref={refPrecio}>{productoSeleccionado.precio}</span>
          </h6>
        </div>
        <div className="cont-preferencias-modal-product">
          <div className="section-botones-talles">
            <header className="header-seleccionar-talle">
              <strong className="talle-title">Seleccionar Talle</strong>
              <p className="guia-talles">Guia de talles</p>
            </header>

            <div className="cont-botones-talles">
              <button className="btn-talle">X</button>
              <button className="btn-talle">XL</button>
              <button className="btn-talle">XXL</button>
            </div>
          </div>
          <h6 className="preferencias-modal-product-disponibilidad">
            Disponibles: {productoSeleccionado.cantidad}
          </h6>
        </div>
        {/*----- Seccion de botones metodos de pago ----*/}

        <button className="btn-change-talle-pago">Seleccionar Talle</button>
      </section>

      {openCloseDataEnvio && (
        <div className="cont-form-data-envio" ref={formEnvioRef}>
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
          <button
            onClick={validateformDataEnvio}
            className="btn-form-data-envio"
          >
            Aceptar
          </button>
        </div>
      )}
    </section>
  );
};
