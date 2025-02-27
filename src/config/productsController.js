/*const Product = require('../models/Product');

const getProducts = async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
    };
    const filter = query ? { category: query } : {};
    const products = await Product.paginate(filter, options);
    res.json({
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
        nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
    });
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.pid);
    res.json(product);
};

const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
};

const updateProduct = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
    res.json(updatedProduct);
};

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.pid);
    res.json({ message: 'Producto eliminado' });
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
};*/