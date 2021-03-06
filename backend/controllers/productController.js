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


const getProductById = asyncHandler(async (req, res) => {
    
    console.log(req.params);

    try {
        const product = await Product.find({ slug: req.params.id });

        if (product.length > 0) {
            res.status(200).json(product[0]);
            console.log(product[0]);
        } else {
            const product = await Product.findById(req.params.id);
            console.log(product)
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404);
                throw new Error("Product not found");
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error("Incorrect URL");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: {
            base: 120
        },
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};
