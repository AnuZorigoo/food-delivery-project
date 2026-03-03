import axios from "axios";

export const api = axios.create({
  baseURL: "BaCKEND_URL",
  headers: { "Content-Type": "application/json" },
});
