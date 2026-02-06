import type { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/order.schema.js";

export const getAllOrders: RequestHandler = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const orders = await OrderModel.find()
    .populate("orderItems.foodId")
    .populate("userId");

  //   const orders = await OrderModel.find({ userId });

  res.status(200).json({ orders });
};
