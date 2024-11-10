import Router from "express";
import {
  dataFormEnvio,
  proccessPayment,
  productosDatabase,
} from "../controllers/payment.controllers.js";
import { addProduct } from "../controllers/web.controllers.js";

const router = Router();



router.get("/productos", productosDatabase);

router.post("/addproduct", addProduct);

router.post('/data_form_envio', dataFormEnvio)

router.post("/proccess_payment", proccessPayment);

export default router;
