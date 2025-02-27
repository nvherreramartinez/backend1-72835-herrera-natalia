import { Cart } from "../models/cart.model.js";

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;

        // Usamos populate para obtener los detalles de los productos
        const cart = await Cart.findById(cid).populate('products.product');

        if (!cart) {
            return res.status(404).send({ message: 'Carrito no encontrado' });
        }

        res.send(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el carrito', error });
    }
};

/*const addProductToCart = async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (productIndex >= 0) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: req.params.pid, quantity: 1 });
    }
    await cart.save();
    res.json(cart);
};

const deleteProductFromCart = async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json(cart);
};

const updateCart = async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body }, { new: true });
    res.json(cart);
};

const updateProductQuantity = async (req, res) => {
    const cart = await Cart.findById(req.params.cid);
    const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
    if (productIndex >= 0) {
        cart.products[productIndex].quantity = req.body.quantity;
    }
    await cart.save();
    res.json(cart);
};

const deleteAllProductsFromCart = async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
    res.json(cart);
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    deleteAllProductsFromCart,
};*/