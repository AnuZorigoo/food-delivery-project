import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods.js";
import { createFood } from "../controllers/food/create-food.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { deleteFood } from "../controllers/food/delete.food.js";
import { updateFood } from "../controllers/food/updatefood.js";

const FoodRouter = Router();

FoodRouter.get("/", authMiddleware, getFoods)
  .post("/create", authMiddleware, createFood)
  .delete("/:id", authMiddleware, deleteFood)
  .put("/:_id", authMiddleware, updateFood);

export { FoodRouter };
