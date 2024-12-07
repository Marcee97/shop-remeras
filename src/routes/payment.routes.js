import Router from "express";
import {
  dataFormEnvio,
  failure,
  paymentProccess,
  pending,
  productosDatabase,
  success,
  webhook,

} from "../controllers/payment.controllers.js";
import { modalProduct, tallesProducts } from "../controllers/web.controllers.js";

const router = Router();



router.get("/productos", productosDatabase);



router.post('/data_form_envio', dataFormEnvio)



router.post('/modal-products', modalProduct)

router.post('/payment-proccess', paymentProccess)

router.get('/talles', tallesProducts)

router.post('/webhook', webhook)

router.get('/success', success)
router.get('/pending', pending)
router.get('/failure', failure)
export default router;
