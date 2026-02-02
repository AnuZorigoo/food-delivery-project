import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserOrders } from "../controllers/order/get-user-orders.js";
import { createOrder } from "../controllers/order/create-order.js";



const OrderRouter=Router();

OrderRouter
.get("/", authMiddleware, getUserOrders)
.post("/create", authMiddleware, createOrder);

export {OrderRouter}