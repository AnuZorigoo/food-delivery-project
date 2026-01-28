import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods.js";
import { createFood } from "../controllers/food/create-food.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const FoodRouter=Router();

FoodRouter.get("/", authMiddleware, getFoods).post("/create", createFood);

export {FoodRouter}