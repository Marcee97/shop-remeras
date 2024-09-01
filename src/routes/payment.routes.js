import Router from "express";
import {
  createOrder,
  database,
  productosDatabase,
  webhook,
} from "../controllers/payment.controllers.js";
import { addProduct} from "../controllers/web.controllers.js";

const router = Router();

router.post("/createOrder", createOrder);

router.post("/webhook", webhook);

router.get("/database", database);

router.get("/productos", productosDatabase);


router.post('/addproduct', addProduct)

export default router;
