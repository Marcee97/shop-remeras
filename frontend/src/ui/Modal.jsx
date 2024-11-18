import { useEffect, useState, useRef } from "react";
import "../style/modal.scss";
import { useNavigate } from "react-router-dom";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import axios from "axios";

export const Modal = ({ infoModals }) => {
  const [dataRecibida, setDataRecibida] = useState([]);
  const [openClosePagos, setopenClosePagos] = useState(false);
  const [openCloseDataEnvio, setOpenCloseDataEnvio] = useState(false);
  const [estadoPayment, setEstadoPayment] = useState("");
  const [articulo, setArticulo] = useState("");
  const refProducto = useRef(null);
  const refPrecio = useRef(null);
  const refDescripcion = useRef(null);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setDataRecibida(infoModals);
  }, [infoModals]);

  const navigate = useNavigate();
  const backShop = () => {
    navigate("/");
  };

  const [loading, setLoading] = useState(false);
  const [backResponse, setBackResponse] = useState(false);
  const [backResponseStatus, setBackResponseStatus] = useState(false);
  const [backResponseTextStatus, setBackResponseTextStatus] = useState("");
  const [email, setEmail] = useState("");
  const inicializarMercadoPago = async () => {
    await loadMercadoPago();
    const mp = new window.MercadoPago(
      "TEST-aa57b093-8dbb-4593-bbeb-f016e89d1138"
    );

    const cardNumberElement = mp.fields
      .create("cardNumber", {
        placeholder: "Número de la tarjeta",
      })
      .mount("form-checkout__cardNumber");
    const expirationDateElement = mp.fields
      .create("expirationDate", {
        placeholder: "MM/YY",
      })
      .mount("form-checkout__expirationDate");
    const securityCodeElement = mp.fields
      .create("securityCode", {
        placeholder: "Código de seguridad",
      })
      .mount("form-checkout__securityCode");

    (async function getIdentificationTypes() {
      try {
        const identificationTypes = await mp.getIdentificationTypes();
        const identificationTypeElement = document.getElementById(
          "form-checkout__identificationType"
        );

        createSelectOptions(identificationTypeElement, identificationTypes);
      } catch (e) {
        return console.error("Error getting identificationTypes: ", e);
      }
    })();

    function createSelectOptions(
      elem,
      options,
      labelsAndKeys = { label: "name", value: "id" }
    ) {
      const { label, value } = labelsAndKeys;

      elem.options.length = 0;

      const tempOptions = document.createDocumentFragment();

      options.forEach((option) => {
        const optValue = option[value];
        const optLabel = option[label];

        const opt = document.createElement("option");
        opt.value = optValue;
        opt.textContent = optLabel;

        tempOptions.appendChild(opt);
      });

      elem.appendChild(tempOptions);
    }

    const paymentMethodElement = document.getElementById("paymentMethodId");
    const issuerElement = document.getElementById("form-checkout__issuer");
    const installmentsElement = document.getElementById(
      "form-checkout__installments"
    );

    const issuerPlaceholder = "Banco emisor";
    const installmentsPlaceholder = "Cuotas";

    let currentBin;
    cardNumberElement.on("binChange", async (data) => {
      const { bin } = data;
      try {
        if (!bin && paymentMethodElement.value) {
          clearSelectsAndSetPlaceholders();
          paymentMethodElement.value = "";
        }

        if (bin && bin !== currentBin) {
          const { results } = await mp.getPaymentMethods({ bin });
          const paymentMethod = results[0];

          paymentMethodElement.value = paymentMethod.id;
          updatePCIFieldsSettings(paymentMethod);
          updateIssuer(paymentMethod, bin);
          updateInstallments(paymentMethod, bin);
        }

        currentBin = bin;
      } catch (e) {
        console.error("error getting payment methods: ", e);
      }
    });

    function clearSelectsAndSetPlaceholders() {
      clearHTMLSelectChildrenFrom(issuerElement);
      createSelectElementPlaceholder(issuerElement, issuerPlaceholder);

      clearHTMLSelectChildrenFrom(installmentsElement);
      createSelectElementPlaceholder(
        installmentsElement,
        installmentsPlaceholder
      );
    }

    function clearHTMLSelectChildrenFrom(element) {
      const currOptions = [...element.children];
      currOptions.forEach((child) => child.remove());
    }

    function createSelectElementPlaceholder(element, placeholder) {
      const optionElement = document.createElement("option");
      optionElement.textContent = placeholder;
      optionElement.setAttribute("selected", "");
      optionElement.setAttribute("disabled", "");

      element.appendChild(optionElement);
    }

    // Este paso mejora las validaciones de cardNumber y securityCode
    function updatePCIFieldsSettings(paymentMethod) {
      const { settings } = paymentMethod;

      const cardNumberSettings = settings[0].card_number;
      cardNumberElement.update({
        settings: cardNumberSettings,
      });

      const securityCodeSettings = settings[0].security_code;
      securityCodeElement.update({
        settings: securityCodeSettings,
      });
    }

    async function updateIssuer(paymentMethod, bin) {
      const { additional_info_needed, issuer } = paymentMethod;
      let issuerOptions = [issuer];

      if (additional_info_needed.includes("issuer_id")) {
        issuerOptions = await getIssuers(paymentMethod, bin);
      }

      createSelectOptions(issuerElement, issuerOptions);
    }

    async function getIssuers(paymentMethod, bin) {
      try {
        const { id: paymentMethodId } = paymentMethod;
        return await mp.getIssuers({ paymentMethodId, bin });
      } catch (e) {
        console.error("error getting issuers: ", e);
      }
    }

    async function updateInstallments(paymentMethod, bin) {
      try {
        const installments = await mp.getInstallments({
          amount: document.getElementById("transactionAmount").value,
          bin,
          paymentTypeId: "credit_card",
        });
        const installmentOptions = installments[0].payer_costs;
        const installmentOptionsKeys = {
          label: "recommended_message",
          value: "installments",
        };
        createSelectOptions(
          installmentsElement,
          installmentOptions,
          installmentOptionsKeys
        );
      } catch (error) {
        console.error("error getting installments: ", e);
      }
    }

    const formElement = document.getElementById("form-checkout");
    formElement.addEventListener("submit", createCardToken);

    async function createCardToken(event) {
      try {
        const tokenElement = document.getElementById("token");
        if (!tokenElement.value) {
          event.preventDefault();
          setLoading(true);
          console.log("es null o undefined o 0 o NaN", tokenElement);
          const token = await mp.fields.createCardToken({
            cardholderName: document.getElementById(
              "form-checkout__cardholderName"
            ).value,
            identificationType: document.getElementById(
              "form-checkout__identificationType"
            ).value,
            identificationNumber: document.getElementById(
              "form-checkout__identificationNumber"
            ).value,
          });
          console.log(token);
          tokenElement.value = token.id;

          const respons = await axios.post(
            "http://localhost:3000/proccess_payment",
            {
              token: token.id,
              transactionAmount: parseFloat(
                document.getElementById("transactionAmount").value
              ),
              description: document.getElementById("description").value,
              email: document.getElementById("form-checkout__email").value,
              paymentMethodId: document.getElementById("paymentMethodId").value,
              installments: document.getElementById(
                "form-checkout__installments"
              ).value,
            }
          );
          setPaymentStatus(respons.data);
          if (respons.data === "approved") {
            const articulo = infoModals[0].nombre;
            const idProducto = infoModals[0].id;
            const email = document.getElementById("form-checkout__email").value;
            console.log(
              respons.data,
              "el codigo 200 para crear mensaje de pago aproved"
            );

            await axios.post("http://localhost:3000/data_form_envio", {
              idProducto,
              direccion,
              numeroDeCalle,
              codigoPostal,
              nombre,
              apellido,
              provincia,
              localidad,
              transactionAmount: parseFloat(
                document.getElementById("transactionAmount").value
              ),
              articulo,
              email,
            });

            document.getElementById("form-checkout__cardNumber").textContent =
              "";
            document.getElementById(
              "form-checkout__expirationDate"
            ).textContent = "";
            document.getElementById("form-checkout__securityCode").textContent =
              "";
            document.getElementById("form-checkout__cardholderName").value = "";
            document.getElementById(
              "form-checkout__identificationNumber"
            ).value = "";
            document.getElementById("form-checkout__email").value = "";

            setBackResponseStatus(true);
            setBackResponseTextStatus(respons.data);
            setLoading(false);
          } else {
            console.log("el pago no se aprovo");
            setLoading(false);
          }
          if (loading === false) {
            const parseBack = respons.status;
            console.log(parseBack);

            console.log(backResponse, "la respuesta");
          }
        }
      } catch (e) {
        console.error("error creating card token: ", e.message, e);
      }
    }
  };

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

  const compraDef = async () => {
    console.log("enviar toda la data");
    console.log(estadoPayment);
  };
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

      setOpenCloseDataEnvio((prevData) => !prevData);
      if (paymentMethod === "MP") {
        setOpenFormMP((prevData) => !prevData);
        console.log("el form de MP redirigido");
      } else {
        setOpenFormTarjeta((prevData) => !prevData);
        inicializarMercadoPago();
      }
    } else {
      console.log("la data para el envio no esta completa");
    }
  };

  return (
    <section className="modal">
      {dataRecibida.map((item, index) => (
        <section key={index} className="modal-cardproduct">
          <p className="btn-back-modal-product" onClick={backShop}>
            <i className="fa-solid fa-arrow-left"></i>Regresar a Shop
          </p>
          <div className="cont-modal-product">
            <img src={item.imagen} alt="imagen producto modal" />
            <h5 ref={refProducto}>{item.nombre}</h5>
            <p className="descripcion-modal-product" ref={refDescripcion}>
              {item.descripcion}
            </p>
          </div>
          <div className="cont-preferencias-modal-product">
            <h6 className="preferencias-modal-product-disponibilidad">
              Disponibles: {infoModals[0].cantidad}
            </h6>
            <h6 className="precio-modal-product">
              TOTAL: $ <span ref={refPrecio}>{item.precio}</span>
            </h6>

            <label htmlFor="talle" className="label-talle-modal-product">
              Talle
            </label>
            <select
              name="talle"
              id="talle"
              className="select-talle-modal-product"
            >
              <option value="S">S</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>

            <label htmlFor="cantidad" className="label-talle-modal-product">
              Cantidad
            </label>
            <select
              name="cantidad"
              id="cantidad"
              className="select-talle-modal-product"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          {/*----- Seccion de botones metodos de pago ----*/}

          {paymentMethod === "inicial" ? (
            <div className="cont-btn-modal-product">
              <p className="text-metodo-de-pago">Metodo de pago</p>
              <div className="cont-botones-metodos-de-pago">
                <button
                  className="btn-comprar-modal-product"
                  onClick={() => despliegoFormEnvio("tarjeta")}
                >
                  Tarjeta
                </button>
                <button
                  className="btn-comprar-modal-product"
                  onClick={() => despliegoFormEnvio("MP")}
                >
                  Mercado Pago
                </button>
              </div>
            </div>
          ) : (
            <div className="cont-form-encabezado-envio">
              {openCloseDataEnvio ? (
                <div className="cont-encabezado-forms">
                  <h4 className="form-encabezado-envio-title">
                    1. Datos para el envio
                  </h4>
                  <p className="form-encabezado-subtitle">
                    Con esta info, nos aseguraremos de que tu remera llegue
                    directo a tu casa!
                  </p>
                </div>
              ) : paymentStatus === "approved" ? null : (
                <div className="cont-encabezado-info-pago">
                  <h4 className="form-encabezado-title-pago">
                    Estas comprando
                  </h4>
                  
                  {paymentStatus === "approved" ? null : (
                    <div>
                      {dataRecibida.map((item, index) => (
                        <div className="cont-form-encabezado-detalle">
                          <p
                            key={index}
                            className="form-encabezado-pago-detalle-compra"
                          >
                         {item.nombre}
                          </p>
                          <img
                            src={item.imagen}
                            alt="Imagen de remera seleccionada en detalle de compra"
                            className="form-encabezado-pago-detalle-img"
                          />
                        </div>
                      ))}
                    </div>
                    
                  )}
                  <p className="form-encabezado-subtitle">
                    Ingrese los datos de su tarjeta para finalizar su compra.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      ))}

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
      {(openFormTarjeta || openFormMP) && (
        <>
          <div className="cont-section-payment">
            {paymentMethod === "inicial" ? null : paymentMethod === "MP" ? (
              <p style={{ color: "red" }}>EL form de MP</p>
            ) : paymentStatus === "approved" ? (
              <div className="cont-message-compra-exitosa">
                {dataRecibida.map((item, index) => (
                  <div key={index} className="message-compra-exitosa">
                    <h5 style={{ color: "#fff" }}>Compra Exitosa</h5>
                    <p style={{ color: "#fff" }}>Compraste {item.nombre}</p>
                    <strong>Pagaste:{item.precio}</strong>
                    <button
                      className="btn-message-compra-exitosa"
                      onClick={() => navigate("/")}
                    >
                      Volver a la tienda
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <form
                id="form-checkout"
                className="form-payment"
                action="http://localhost:3000/proccess_payment"
                method="POST"
              >
                <div id="form-checkout__cardNumber" className="container"></div>
                <div
                  id="form-checkout__expirationDate"
                  className="container"
                ></div>
                <div
                  id="form-checkout__securityCode"
                  className="container"
                ></div>
                <input
                  type="text"
                  id="form-checkout__cardholderName"
                  placeholder="Titular de la tarjeta"
                  className="container"
                />
                <select
                  id="form-checkout__issuer"
                  name="issuer"
                  defaultValue=""
                  className="select-banco-emisor"
                >
                  <option value="" disabled>
                    Banco emisor
                  </option>
                </select>

                <input
                  type="text"
                  id="form-checkout__identificationNumber"
                  name="identificationNumber"
                  placeholder="Número de documento"
                  className="container"
                />
                <select
                  id="form-checkout__identificationType"
                  name="identificationType"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Tipo de documento
                  </option>
                </select>
                <select
                  id="form-checkout__installments"
                  name="installments"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Cuotas
                  </option>
                </select>

                <input
                  type="email"
                  id="form-checkout__email"
                  name="email"
                  placeholder="E-mail"
                  className="container"
                />

                <input id="token" name="token" type="hidden" />
                <input
                  id="paymentMethodId"
                  name="paymentMethodId"
                  type="hidden"
                />
                <input
                  id="transactionAmount"
                  name="transactionAmount"
                  type="hidden"
                  value={infoModals[0].precio}
                  className="container"
                />
                <input
                  id="description"
                  name="description"
                  type="hidden"
                  value="Nome do Produto"
                />

                <button
                  type="submit"
                  id="form-checkout__submit"
                  onClick={compraDef}
                >
                  Pagar
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </section>
  );
};
