import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.js";

export const updateFood: RequestHandler = async (req, res) => {
  const { _id } = req.params;
  const body = req.body;

  console.log(body);

  const food = await FoodModel.findByIdAndUpdate(_id, body, { new: true });

  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  res.status(200).json(food);
};
