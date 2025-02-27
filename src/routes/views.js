/*const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await Product.find();
    res.render('realTimeProducts', { products });
});

module.exports = router;*/