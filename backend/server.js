import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

console.log("Connecting DB...");
connectDB();
const app = express();


// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(
        `[ Environment: ${process.env.NODE_ENV} ] : Listening on port ${PORT}`
            .green
    );
});

//Middlewares
app.use(notFound);
app.use(errorHandler);