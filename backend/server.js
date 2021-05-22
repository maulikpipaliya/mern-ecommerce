const express = require('express')
const products = require('./data/products')

const app = express();

app.get('/api/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === parseInt(req.params.id));
    res.status(200).json(product)
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
});