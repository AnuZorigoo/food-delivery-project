import { Router } from "express";
import { getCategories } from "../controllers/category/get-categories.js";
import { createCategory } from "../controllers/category/create-category.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories).post(
  "/create",
  authMiddleware,
  createCategory,
);

export { CategoryRouter };
