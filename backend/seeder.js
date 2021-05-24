import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const usersCreated = await User.insertMany(users);

    const adminID = usersCreated[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminID,
        slug: product.name
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[-]+/g, "-")
          .replace(/[^\w-]+/g, ""),
      };
    });

    await Product.insertMany(sampleProducts);

    console.log(`[INFO] : Data Added from files`.green);
  } catch (error) {
    console.log(
      `[ERROR] : Error - ${error.message}  while adding data from files`.red
    );
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log(`[INFO] : Data Removed from Database`.green);
  } catch (error) {
    console.log(
      `[ERROR] : Error - ${error.message}  while removing data from files`.red
    );
  }
};

// importData();
