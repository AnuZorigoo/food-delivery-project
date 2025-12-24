import { Router } from "express";
import { getFoods } from "../controllers/food/get-foods.js";
import { createFood } from "../controllers/food/create-food.js";


const FoodRouter=Router();

FoodRouter.get("/", getFoods).post("/", createFood);

export {FoodRouter}