import axios from "axios";

export const api = axios.create({
  baseURL: "https://food-delivery-project-bgit.vercel.app/",
  headers: { "Content-Type": "application/json" },
});

//test
