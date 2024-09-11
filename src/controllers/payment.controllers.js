import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { pool } from "../database.js";

export const createOrder = async (req, res) => {
  try {
    const { producto, cantidad, precio, descripcion, formularioEnvio } =
      req.body;

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
          "https://arabic-jones-refugees-sonic.trycloudflare.com/webhook",
        external_reference: JSON.stringify({ formularioEnvio }),
        back_urls: {
          pending: "http://localhost:3000/pending",
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
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
        "INSERT INTO envios (nombre, apellido, calle, numero, piso, departamento, codigopostal, provincia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          datosEnvioParse.formularioEnvio.nombre,
          datosEnvioParse.formularioEnvio.apellido,
          datosEnvioParse.formularioEnvio.calle,
          datosEnvioParse.formularioEnvio.numero,
          datosEnvioParse.formularioEnvio.piso,
          datosEnvioParse.formularioEnvio.departamento,
          datosEnvioParse.formularioEnvio.codigopostal,
          datosEnvioParse.formularioEnvio.provincia,
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
  const { nombre, apellido, calle } = req.body;

  await pool.query(
    "INSERT INTO ventas (nombre, apellido, calle) VALUES ($1, $2, $3)",
    [nombre, apellido, calle]
  );
};

export const productosDatabase = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM productos");
    res.json(response.rows);
  } catch (error) {
    console.log(error);
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
