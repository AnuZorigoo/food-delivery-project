import express from "express";
import cors from "cors";
import {
  AuthRouter,
  FoodRouter,
  OrderRouter,
  CategoryRouter,
} from "./routes/index.js";
import { connectToDatabase } from "./database/index.js";

await connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/foods", FoodRouter);
app.use("/categories", CategoryRouter);
app.use("/orders", OrderRouter);
app.use("/auth", AuthRouter);

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`);
});
