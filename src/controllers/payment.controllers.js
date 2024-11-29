import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../database.js";
import dotenv from "dotenv";
import { json, response } from "express";
dotenv.config();

//-------Base de datos Dirigida al Front --------

export const productosDatabase = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (error) {
    console.log(error, "error peticion productos a base de datos");
  }
};

export const dataFormEnvio = async (req, res) => {
  const direccion = req.body.direccion;
  const numeroDeCalle = req.body.numeroDeCalle;
  const codigoPostal = req.body.codigoPostal;
  const localidad = req.body.localidad;
  const provincia = req.body.provincia;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const transactionAmount = req.body.transactionAmount;
  const articulo = req.body.articulo;
  const email = req.body.email;
  const id = req.body.idProducto;
  console.log(req.body);

  try {
    await pool.query(
      "INSERT INTO ventas (total, direccion,numero, postal, email, localidad, provincia, nombre, apellido, articulo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        transactionAmount,
        direccion,
        numeroDeCalle,
        codigoPostal,
        email,
        localidad,
        provincia,
        nombre,
        apellido,
        articulo,
      ]
    );

    await pool.query(
      "UPDATE productos SET cantidad = cantidad - 1 WHERE id = ? AND cantidad > 0",
      [id]
    );

    res.status(200).send({ message: "lionel messi" });
  } catch (err) {
    console.error(err);
  }
};

//5031 7557 3453 0604

// ------Pago con tarjeta individual -----

export const proccessPayment = async (req, res) => {
  /* console.log(req.body.direccionEnvio);
  const uuid = uuidv4();
  const client = new MercadoPagoConfig({
    accessToken:
      "TEST-8019716289741291-100417-27c12e4b06655c0a09c1476629e602e6-699862682",
    options: { timeout: 1000, idempotencyKey: uuid },
  });

  const payment = new Payment(client);

  const body = {
    transaction_amount: Number(req.body.transactionAmount),
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,

    payer: {
      email: req.body.email,

      identification: {
        type: req.body.identificationType,
        number: req.body.identificationNumber,
      },
    },
    token: req.body.token,
  };
  const tokens = req.body.token;
  console.log(tokens);

  const requestOptions = {
    idempotencyKey: uuid,
  };

  try {
    const response = await payment.create({ body, requestOptions });
    res.status(200).json(response.status);
    console.log(response);
    console.log(response.status);

    if (response.status === "approved") {
      console.log(response.transaction_amount);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
    */
};

export const paymentProccess = async (req, res) => {
  try {
    console.log(req.body);

    
    const {
      nombre,
      apellido,
      provincia,
      localidad,
      calle,
      numeroDeCalle,
      codigoPostal,
      unitPrice,
      title,
      email,
      selectTalle
    } = req.body;

    const shippingData = {
      nombre,
      apellido,
      provincia,
      localidad,
      calle,
      numeroDeCalle,
      codigoPostal,
      title,
      email,
      selectTalle
    };

    const shippingDataSerial = JSON.stringify(shippingData);

    console.log(nombre, apellido);

    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-1640851723532033-081209-4649082d7ab35fa373147d3be490c839-1940967055",
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: title,
            quantity: 1,
            unit_price: unitPrice,
          },
        ],
        external_reference: shippingDataSerial,

        back_urls: {
          success: "http://localhost:5173/",
          failure: "http://localhost:3000/pending",
          pending: "http://localhost:3000/failure",
        },
        auto_return: "approved",
        notification_url:
          "https://avoid-waiting-nightlife-construct.trycloudflare.com/webhook",
      },
    });

    const preferenceId = response.id;
    console.log(response);
    return res.status(200).json({ preferenceId });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error En endpoint paymeproccess");
  }
};


//5031 7557 3453 0604

export const webhook = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-1640851723532033-081209-4649082d7ab35fa373147d3be490c839-1940967055",
    });

    const payment = new Payment(client);

    const dataPayment = await payment.get({ id: req.query["data.id"] });

    console.log(dataPayment, "el webhooj");
    const shippingNotSerial = JSON.parse(dataPayment.external_reference);
    const {transaction_amount} = dataPayment
console.log(transaction_amount,'ak la transaction')
    const {
      nombre,
      apellido,
      provincia,
      localidad,
      calle,
      numeroDeCalle,
      codigoPostal,
      title,
      email,
      selectTalle
    } = shippingNotSerial


console.log(nombre, apellido)

    await pool.query('INSERT INTO ventas (nombre, apellido, provincia, localidad, calle, numero, codigoPostal,email, total, articulo, talle) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)',[nombre, apellido, provincia, localidad, calle, numeroDeCalle, codigoPostal,email, transaction_amount, title, selectTalle])
    console.log(shippingNotSerial);

    return res.status(200).send("Data recibida");
  } catch (err) {
    console.log(err);
    res.status(500).send("error en el webhook backend");
  }
};



export const success = (req, res) => {
  res.status(200).send("succes");
};

export const pending = (req, res) => {
  res.status(200).send("pending");
};

export const failure = (req, res) => {
  res.status(200).send("failure");
};
