import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { pool } from "../database.js";

export const createOrder = async (req, res) => {
  try {

const {producto, cantidad, precio} = req.body

console.log(producto, precio)

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
            description: 'remera descriiciom',
            quantity: cantidad,
            unit_price: precio
          },
        ],
        notification_url:
          "https://colony-group-rp-skill.trycloudflare.com/webhook",
      },
    });
    console.log(response)
    res.json(response)
  } catch (error) {
    console.log(error);
  }
};
// 5031 7557 3453 0604 Tarjeta de prueba

export const webhook = async (req, res) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-1640851723532033-081209-4649082d7ab35fa373147d3be490c839-1940967055",
    });

    const payment = new Payment(client);

    const response = await payment.get({ id: req.query["data.id"] });

    const paymentEmail = response.payer.email;
    const paymentCantidad = response.transaction_amount;

    const database = await pool.query(
      `INSERT INTO compradores (email, cantidad) VALUES ('${paymentEmail}', ${paymentCantidad})`
    );
    console.log(response);

    res.status(200).send(database);
  } catch (error) {
    console.log(error);
    res.status(500).send("No funciona");
  }
};

export const database = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM compradores");

  res.json(rows);
};

export const productosDatabase = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");

    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};
