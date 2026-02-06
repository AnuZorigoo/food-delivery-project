import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserOrders } from "../controllers/order/get-user-orders.js";
import { createOrder } from "../controllers/order/create-order.js";
import { updateOrderStatus } from "../controllers/order/update-order-status.js";
import { getAllOrders } from "../controllers/order/index.js";

const OrderRouter = Router();

OrderRouter.get("/", authMiddleware, getUserOrders)
  .get("/all", authMiddleware, getAllOrders)
  .post("/create", authMiddleware, createOrder)
  .patch("/status", authMiddleware, updateOrderStatus);
 

export { OrderRouter };
