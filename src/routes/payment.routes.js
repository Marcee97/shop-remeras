import Router from "express";
import {
  createOrder,
  database,
  productosDatabase,
  webhook,
} from "../controllers/payment.controllers.js";
import { infoVenta } from "../controllers/web.controllers.js";

const router = Router();

router.post("/createOrder", createOrder);

router.post("/webhook", webhook);

router.get("/database", database);

router.get("/productos", productosDatabase);

router.post('/infoVenta', infoVenta)


export default router;
