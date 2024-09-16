import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { pool } from "../database.js";
import { z } from "zod";


export const createOrder = async (req, res) => {
  try {
    const { producto, cantidad, precio, descripcion, formularioEnvio } =
      req.body;


const envioSchema = z.object({
  email: z.string().min(5, {message: 'Email demasiado corto'}).email({message: 'Email invalido'}),
  nombre: z.string().min(3, {message: 'Nombre demasiado corto'}),
  apellido: z.string().min(3, {message: 'Apellido demasiado corto'}),
  calle: z.string().min(3, {message: 'Calle no valida'}),
  numero: z.string().min(1, {message: 'Numero de calle Invalido'}),
  codigopostal: z.string().min(2, {message: 'Codigo postal No Valido'}),
  provincia: z.string().min(2, {message: 'Selecciona una provincia'})
})

const validation = envioSchema.safeParse(formularioEnvio)


if(!validation.success) {
  return res.status(400).json(validation.error.errors)
}



    console.log(producto, precio);

    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-1640851723532033-081209-4649082d7ab35fa373147d3be490c839-1940967055",
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: producto,
            description: descripcion,
            quantity: cantidad,
            unit_price: precio,
          },
        ],
        notification_url:
          "shop-remeras-production.up.railway.app/webhook",
        external_reference: JSON.stringify({ formularioEnvio }),
        auto_return: "approved",
        back_urls: {
          pending: "shop-remeras-production.up.railway.app/pending",
          success: "shop-remeras-production.up.railway.app/success",
          failure: "shop-remeras-production.up.railway.app/failure",
        },
      },
    });
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
// 5031 7557 3453 0604 Tarjeta de prueba
//22332611566, 22332706662 ultima Orden

export const webhook = async (req, res) => {
  try {
    console.log(req.body, "deberia estar el nombre");

    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-1640851723532033-081209-4649082d7ab35fa373147d3be490c839-1940967055",
    });

    const payment = new Payment(client);

    const response = await payment.get({ id: req.query["data.id"] });

    const status = response.status;
    const paymentEmail = response.payer.email;
    const paymentTransaction = response.transaction_amount;
    const descripcion = response.description;
    const order = response.order.id;
    const datosEnvio = response.external_reference;
    const datosEnvioParse = JSON.parse(datosEnvio);
    console.log(response, order);

    if (status === "approved") {
      await pool.query(
        "INSERT INTO ventas (nombre, email, precio, orden) VALUES ($1, $2, $3, $4)",
        [descripcion, paymentEmail, paymentTransaction, order]
      );
      await pool.query(
        "INSERT INTO envios (nombre, apellido, calle, numero, piso, departamento, codigopostal, provincia, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          datosEnvioParse.formularioEnvio.nombre,
          datosEnvioParse.formularioEnvio.apellido,
          datosEnvioParse.formularioEnvio.calle,
          datosEnvioParse.formularioEnvio.numero,
          datosEnvioParse.formularioEnvio.piso,
          datosEnvioParse.formularioEnvio.departamento,
          datosEnvioParse.formularioEnvio.codigopostal,
          datosEnvioParse.formularioEnvio.provincia,
          datosEnvioParse.formularioEnvio.email
        ]
      );

      console.log(
        datosEnvioParse.formularioEnvio.nombre,
        "external reference data obtenida"
      );

      console.log("se aprobo guardar en basedata");
      return res.status(200).send("pago aprobado y en basedata");
    } else {
      return res.status(200).send("pago no aprovado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("No funciona");
  }
};

export const infoDeEntrega = async (req, res) => {
  
const response = await pool.query("SELECT * FROM productos")
   res.json(response)
  
};

export const productosDatabase = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM productos");
    res.json(response.rows);
  } catch (error) {
    console.log(error, 'error peticion productos a base de datos');
  }
};

export const pending = (req, res) => {
  res.send("Pendiente");
};
export const success = (req, res) => {
  res.send("Success");
};
export const failure = (req, res) => {
  res.send("Failure");
};
