import { MercadoPagoConfig, Payment } from "mercadopago";
import { v4 as uuidv4 } from "uuid";

import { pool } from "../database.js";
import dotenv from "dotenv";
dotenv.config()





   
// 5031 7557 3453 0604 Tarjeta de prueba




export const productosDatabase = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
    
  } catch (error) {
    console.log(error, 'error peticion productos a base de datos');
  }
};


export const dataFormEnvio = async(req, res) => {
  console.log(req.body)
 try{

   
   res.status(200).send({message:'lionel messi'})
  }catch(err){
    console.error(err)
  }
}

//5031 7557 3453 0604
export const proccessPayment = async(req, res) => {
  
console.log(req.body.direccionEnvio)
  const uuid = uuidv4()
  const client = new MercadoPagoConfig({ accessToken: 'TEST-8019716289741291-100417-27c12e4b06655c0a09c1476629e602e6-699862682', options: { timeout: 1000, idempotencyKey: uuid } });

  // Step 3: Initialize the API object
  const payment = new Payment(client);
  
  // Step 4: Create the request object
  const body = {
    transaction_amount: Number(req.body.transactionAmount),
    description:  req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,

    
    payer: {
      email: req.body.email,
      
      identification:{
        type: req.body.identificationType,
        number: req.body.identificationNumber
      }
    },
    token: req.body.token,
    
    
  };
  const tokens = req.body.token
  console.log(tokens)
  // Step 5: Create request options object - Optional
  const requestOptions = {
    idempotencyKey: uuid,
  };
  
  try{

    const response = await payment.create({ body, requestOptions });
    res.status(200).json(response.status)
    console.log(response)
    console.log(response.status)

    if(response.status === 'approved'){
      console.log(response.transaction_amount)
      const transactionAmount = response.transaction_amount
      pool.query('INSERT INTO ventas (total) VALUES (?)', [transactionAmount])
    }
  }catch(err){
    console.log(err)
    res.status(500).json({err})
  }
}