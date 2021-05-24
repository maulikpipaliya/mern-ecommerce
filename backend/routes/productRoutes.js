import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// desc   : Fetch all products
// route  : GET /api/products
// access : public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (e) {
      throw new Error("Couldn't fetch all product list");
    }
  })
);

// desc   : Fetch specific product
// route  : GET /api/products/:slug
// access : public
router.get(
  "/:slugid",
  asyncHandler(async (req, res) => {
    // const product = products.find((p) => p._id === parseInt(req.params.id));
    console.log(req.params);

    try {
      const product = await Product.find({ slug: req.params.slugid });

      if (product.length > 0) {
        res.status(200).json(product[0]);
        console.log(product[0]);
      } else {
        const product = await Product.findById(req.params.slugid);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404);
          throw new Error("Product not found");
        }
      }
    } catch (error) {
      // res.status(404).json({
      //   message: `${error.message}`,
      // });
      throw new Error("Incorrect URL");
    }
  })
);

export default router;
