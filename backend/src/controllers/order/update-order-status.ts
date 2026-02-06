import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema/index.js";

export const updateOrderStatus: RequestHandler = async (req, res) => {
  try {
    const { orderIds, status } = req.body;

    if (!orderIds?.length || !status) {
      return res.status(400).json({ message: "Invalid data" });
    }

    await OrderModel.updateMany({ _id: { $in: orderIds } }, { status });

    res.json({ message: "Orders updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
