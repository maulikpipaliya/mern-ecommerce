import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

console.log("Connecting DB...");
connectDB();
const app = express();

//Routes
app.use("/api/products", productRoutes);

//Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(
    `[ Environment: ${process.env.NODE_ENV} ] : Listening on port ${PORT}`.green
  );
});
