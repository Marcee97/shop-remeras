import { useContext, useEffect, useState } from "react";
import { set, z } from "zod";
import "../css/components/formEnvio.css";
import axios from "axios";
import ElContexto from "../context/ProductContext";
import { reuleaux } from "ldrs";

reuleaux.register();

export const FormEnvio = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [calle, setCalle] = useState("");
  const [numeroDeCalle, setNumeroDeCalle] = useState("");
  const [piso, setPiso] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [errores, setErrores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    productoSeleccionado,
    openCloseSectionPay,
    setOpenCloseSectionPay,
    openInfoMetodoDePago,
    setOpenInfoMetodoDePago,
    setOpenCloseFormEnvio,
    openCloseFormEnvio,
    refFormEnvio,
    refInputEmail,
    selectTalle,
    setPreferenceId,
    idproducto,
    setLoadingWallet,
    refContBtnWallet
  } = useContext(ElContexto);

 
  const envioSchema = z.object({
    email: z.string().email({ message: "Email invalido" }),
    nombre: z
      .string()
      .min(3, { message: "El Nombre debe contener al menos 3 letras" }),
    apellido: z
      .string()
      .min(2, { message: "El Apellido debe contener al menos 2 letras" }),
    localidad: z
      .string()
      .min(2, { message: "La Localidad debe contener al menos 2 letras" }),
    calle: z
      .string()
      .min(2, { message: "La Calle debe contener al menos 2 letras" }),
    numeroDeCalle: z.number().min(2, {
      message: "El numero de calle debe contener al menos 2 numeros",
    }),
    piso: z
      .number()
      .min(0, { message: "Especifica el numero de piso min" })
      .max(80, { message: "Especifica el numero de piso" }),
    departamento: z
      .string()
      .min(1, { message: "El departamento debe contener al menos 1 letra" }),
    codigoPostal: z
      .number()
      .min(2, { message: "El codigo postal debe contener al menos 2 numeros" }),
    provincia: z.string().min(2, { message: "Selecciona una provincia" }),
    telefono: z
      .number()
      .min(8, { message: "El telefono debe contener al menos 8 numeros" }),
    dni: z
      .number()
      .min(7, { message: "El DNI debe contener al menos 7 numeros" }),
    selectTalle: z.string(),
    articulo: z.string(),
    precio: z.number(),
  });

  //Funcion para validar el formulario
  const validateForm = async () => {
   
    const precio = productoSeleccionado[0].precio;
    const articulo = productoSeleccionado[0].nombre;

    console.log(precio);
    try {
      const datosEnvio = {
        email,
        nombre,
        apellido,
        calle,
        numeroDeCalle: numeroDeCalle ? parseInt(numeroDeCalle, 10) : 0,
        piso: piso ? parseInt(piso, 10) : 9999,
        departamento,
        codigoPostal: codigoPostal ? parseInt(codigoPostal, 10) : 0,
        provincia,
        localidad,
        telefono: telefono ? parseInt(telefono, 10) : 0,
        dni: dni ? parseInt(dni, 10) : 0,
        precio,
        selectTalle,
        articulo,
      };

      const validData = envioSchema.parse(datosEnvio);
      console.log(validData);

      const response = await axios.post(
        "http://localhost:3000/payment-proccess",
        {
          validData,
          idproducto,
        }
      );

      if (response.status === 200) {
        console.log("Datos enviados correctamente");
        setOpenInfoMetodoDePago((prevState) => !prevState);
        setOpenCloseFormEnvio("completed");
        setPreferenceId(response.data.preferenceId);
        setTimeout(() => {
          setOpenCloseSectionPay((prevState) => !prevState);
        }, 1800);
        setTimeout(()=> {
          const contBtnWallet = refContBtnWallet.current
          contBtnWallet.style.opacity = 1
          contBtnWallet.style.transform = "translateY(0%)"
        },4200)

        setIsLoading((prevState) => !prevState);
        console.log(response.data.preferenceId);
      } else {
        console.log("Error al enviar los datos");
      }
    } catch (err) {
      setErrores(err.errors);
      console.log(err.errors);
      setIsLoading((prevState) => !prevState);
    }
  };

  const erroresForm = (err) => {
    const error = errores.find((error) => error.path && error.path[0] === err);

    return error ? error.message : null;
  };

  const classFormEnvio = {
    inicial: "inicial",
    open: "formenvio",
    completed: "completed",
  };

  return (
    <section className={classFormEnvio[openCloseFormEnvio]} ref={refFormEnvio}>
      <div
        className={
          openCloseFormEnvio !== "completed"
            ? "texto-completed"
            : "texto-completed opacity"
        }
      >
        <div>
          <h4>Datos de envio</h4>
          <p className="texto-completed__completados">(Completados)</p>
        </div>
        <button className="btn-editar">Editar</button>
      </div>
      <div className="cont-formenvio">
        <div className="formenvio__total">
          <h3 className="formenvio__comprando">Comprando</h3>
          <p className="formenvio__total-detalle">
            {productoSeleccionado?.[0] ? `${productoSeleccionado[0].nombre}` : "Cargando"}
          </p>
          <p className="formenvio__total-detalle">
        ({productoSeleccionado?.[0] ? `${productoSeleccionado[0].precio}` : "Cargando"})
          </p>
        </div>
        <div
          className={
            openCloseFormEnvio === "completed"
              ? "formenvio__inputs-contacto opacityoff"
              : "formenvio__inputs-contacto"
          }
        >
          <h4>CONTACTO</h4>
          {erroresForm("email") && (
            <p className="errores-formenvio">{erroresForm("email")}</p>
          )}
          <input
            type="email"
            className="input-formenvio"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            ref={refInputEmail}
          />
        </div>
        <div
          className={
            openCloseFormEnvio === "completed"
              ? "formenvio__inputs-direccion opacityoff"
              : "formenvio__inputs-direccion"
          }
        >
          <div className="formenvio__inputs-direccion__datos">
            <h4>INFORMACION</h4>
            {erroresForm("nombre") && (
              <p className="errores-formenvio">{erroresForm("nombre")}</p>
            )}
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="input-formenvio"
            />
            {erroresForm("apellido") && (
              <p className="errores-formenvio">{erroresForm("apellido")}</p>
            )}

            <input
              type="text"
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              className="input-formenvio"
            />
            {erroresForm("dni") && (
              <p className="errores-formenvio">{erroresForm("dni")}</p>
            )}
            <input
              type="text"
              placeholder="DNI"
              onChange={(e) => setDni(e.target.value)}
              className="input-formenvio"
            />
            {erroresForm("telefono") && (
              <p className="errores-formenvio">{erroresForm("telefono")}</p>
            )}
            <input
              type="text"
              placeholder="Telefono"
              onChange={(e) => setTelefono(e.target.value)}
              className="input-formenvio"
            />
            <p className="formenvio__mensage-telefono">
              Tu telefono es en caso de tener algun problema con el envio
            </p>
          </div>

          <div className="formenvio__inputs-direccion__direccion">
            <h4
              className={openCloseFormEnvio === "completed" ? "opacityoff" : ""}
            >
              DIRECCION
            </h4>
            {erroresForm("calle") && (
              <p className="errores-formenvio">{erroresForm("calle")}</p>
            )}

            <input
              type="text"
              onChange={(e) => setCalle(e.target.value)}
              placeholder="Calle"
              className="input-formenvio"
            />
            {erroresForm("numeroDeCalle") && (
              <p className="errores-formenvio">
                {erroresForm("numeroDeCalle")}
              </p>
            )}

            <input
              type="number"
              placeholder="Numero De Calle"
              onChange={(e) => setNumeroDeCalle(e.target.value)}
              className="input-formenvio"
            />
            {erroresForm("piso") && (
              <p className="errores-formenvio">{erroresForm("piso")}</p>
            )}
            <input
              type="number"
              placeholder="Piso"
              onChange={(e) => setPiso(e.target.value)}
              className="input-formenvio"
            />
            {erroresForm("departamento") && (
              <p className="errores-formenvio">{erroresForm("departamento")}</p>
            )}

            <input
              type="text"
              placeholder="Departamento"
              onChange={(e) => setDepartamento(e.target.value)}
              className="input-formenvio"
            />
            {erroresForm("provincia") && (
              <p className="errores-formenvio">{erroresForm("provincia")}</p>
            )}
            <select
              name="Provincia"
              className="input-formenvio__select"
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="" disabled>
                Provincia
              </option>
              <option value="buenos_aires">Buenos Aires</option>
              <option value="catamarca">Catamarca</option>
              <option value="chaco">Chaco</option>
              <option value="chubut">Chubut</option>
              <option value="cordoba">Córdoba</option>
              <option value="corrientes">Corrientes</option>
              <option value="entre_rios">Entre Ríos</option>
              <option value="formosa">Formosa</option>
              <option value="jujuy">Jujuy</option>
              <option value="la_pampa">La Pampa</option>
              <option value="la_rioja">La Rioja</option>
              <option value="mendoza">Mendoza</option>
              <option value="misiones">Misiones</option>
              <option value="neuquen">Neuquén</option>
              <option value="rio_negro">Río Negro</option>
              <option value="salta">Salta</option>
              <option value="san_juan">San Juan</option>
              <option value="san_luis">San Luis</option>
              <option value="santa_cruz">Santa Cruz</option>
              <option value="santa_fe">Santa Fe</option>
              <option value="santiago_del_estero">Santiago del Estero</option>
              <option value="tierra_del_fuego">Tierra del Fuego</option>
              <option value="tucuman">Tucumán</option>
              <option value="caba">Ciudad Autónoma de Buenos Aires</option>
            </select>

            {erroresForm("localidad") && (
              <p className="errores-formenvio">{erroresForm("localidad")}</p>
            )}

            <input
              type="text"
              placeholder="Localidad"
              onChange={(e) => setLocalidad(e.target.value)}
              className="input-formenvio"
            />
          </div>

          <div className="formenvio__inputs-envio__codigoPostal">
            <h4>CODIGO POSTAL</h4>
            {erroresForm("codigoPostal") && (
              <p className="errores-formenvio">{erroresForm("codigoPostal")}</p>
            )}
            <input
              type="text"
              placeholder="CodigoPostal"
              onChange={(e) => setCodigoPostal(e.target.value)}
              className="input-formenvio"
            />
          </div>

          <p className="formenvio__mensage-socalo">
            Usaremos esta información únicamente para realizar el envío de tu
            pedido
          </p>
        </div>
        <button className="formenvio__btn-submit" onClick={validateForm}>
          {isLoading ? (
            <l-reuleaux
              size="37"
              stroke="2"
              stroke-length="0.15"
              bg-opacity="0.1"
              speed="1.2"
              color="black"
            ></l-reuleaux>
          ) : (
            "Aceptar"
          )}
        </button>
      </div>
    </section>
  );
};
