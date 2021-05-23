import express from"express";
import products from "./data/products.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === parseInt(req.params.id));
  res.status(200).json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`[ Environment: ${process.env.NODE_ENV} ] : Listening on port ${PORT}`);
});
