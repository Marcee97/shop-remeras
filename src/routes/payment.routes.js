import Router from "express";
import {
  createOrder,
  
  failure,
  infoDeEntrega,
  pending,
  productosDatabase,
  success,
  webhook,
} from "../controllers/payment.controllers.js";
import { addProduct } from "../controllers/web.controllers.js";

const router = Router();

router.post("/createOrder", createOrder);

router.post("/webhook", webhook);

router.post("/infoentrega", infoDeEntrega);

router.get("/productos", productosDatabase);

router.get("/pending", pending);

router.get("/succes", success);

router.get("/failure", failure);

router.post("/addproduct", addProduct);

export default router;
