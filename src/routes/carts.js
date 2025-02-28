import { Router } from "express";
import { validateCreateCart } from "../middlewares/validacionMiddlewares.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

export const CartsRouter = Router();

/*CartsRouter.post('/', validateCreateCart, async (req, res) => {
    try {
        const { id, timestamp, products } = req.body;
        const newCart = new Cart({ id, timestamp, products });
        await newCart.save();
        res.status(201).send({
            mensaje: 'Carrito creado exitosamente',
            data: newCart
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el carrito', error });
    }
});*/
CartsRouter.post('/', validateCreateCart, async (req, res) => {
    try {
        const { products } = req.body;  // Solo recibe products
        const newCart = new Cart({ products });
        await newCart.save();
        res.status(201).send({
            mensaje: 'Carrito creado exitosamente',
            data: newCart
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el carrito', error });
    }
});
/*CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).send({ message: 'Producto inexistente' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }

        const productInCart = cart.products.find(p => p.product.equals(pid));
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).send({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).send({ message: 'Error al agregar el producto al carrito', error });
    }
});*/
CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).send({ message: 'ID de carrito o producto inválido' });
        }

        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).send({ message: 'Producto inexistente' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }

        const productInCart = cart.products.find(p => p.product.equals(pid));
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(200).send({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).send({ message: 'Error al agregar el producto al carrito', error });
    }
});
CartsRouter.get('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el carrito', error });
    }
});

CartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }

        cart.products = cart.products.filter(p => !p.product.equals(req.params.pid));
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto del carrito', error });
    }
});

CartsRouter.put('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body.products }, { new: true });
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }
        res.send(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el carrito', error });
    }
});

/*CartsRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito no encontrado' });
        }

        const productIndex = cart.products.findIndex(p => p.product.equals(req.params.pid));
        if (productIndex >= 0) {
            cart.products[productIndex].quantity = req.body.quantity;
            await cart.save();
            return res.send(cart);
        }
        res.status(404).send({ message: 'Producto no encontrado en el carrito' });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar la cantidad del producto en el carrito', error });
    }
});*/
CartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).send({ message: 'ID de carrito o producto inválido' });
        }

        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }

        cart.products = cart.products.filter(p => !p.product.equals(new mongoose.Types.ObjectId(pid)));
        await cart.save();
        res.send(cart);
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto del carrito', error });
    }
});

CartsRouter.delete('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.cid);
        if (!cart) {
            return res.status(404).send({ message: 'Carrito inexistente' });
        }
        res.send({ message: 'Carrito eliminado exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el carrito', error });
    }
});
