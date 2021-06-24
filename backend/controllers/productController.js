import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// desc   : Fetch all products
// route  : GET /api/products
// access : public
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        throw new Error("Couldn't fetch all product list");
    }
});

// desc   : Fetch specific product
// route  : GET /api/products/:slugid
// access : public
const getProductById = asyncHandler(async (req, res) => {
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

        throw new Error("Incorrect URL");
    }
});

export { getProducts,getProductById };
