import express from "express";
import { products } from "./datamock/products";
const app = express();

app.get("/", (req, res) => {
  res.json(products);
});

export const viteNodeApp = app;
