import { Router } from "express";
import path from 'path';
import { config } from '../config/index.js';
import fs from 'fs';
import { validateCreateCart } from "../middlewares/validacionMiddlewares.js";

export const CartsRouter = Router();

const pathToCarts = path.join(config.dirname, '/src/data/carts.json');

CartsRouter.post('/', validateCreateCart, async (req, res) => {
    let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8')
    const carts = JSON.parse(cartsString);

    const {id, timestamp, products,
    } = req.body
    const newcart = { id, timestamp, products };
    
    carts.push(newcart)
    const cartsStringified = JSON.stringify(carts, null, '\t')
    await fs.promises.writeFile(pathToCarts, cartsStringified)  
    res.status(201).send({
        mensaje: 'Carrito creado exitosamente',
        data: newcart
    });
})

CartsRouter.get('/cart/:cid', async (req, res) => {
    let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
    const carts = JSON.parse(cartsString); 
    const { cid } = req.params; 

    const cart = carts.find(c => c.id === Number(cid)); 

    if (!cart) {
    return res.status(404).send({ message: 'Carrito no encontrado' });
    }

    res.send({ cart });
});


CartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    let productsString = await fs.promises.readFile(path.join(config.dirname, '/src/data/products.json'), 'utf-8');
    const products = JSON.parse(productsString);

    const product = products.find(p => p.id === Number(pid));
    if (!product) {
    return res.status(404).send({ message: 'Producto no encontrado' });
    }

    let cartsString = await fs.promises.readFile(pathToCarts, 'utf-8');
    const carts = JSON.parse(cartsString);

    const cart = carts.find(c => c.id === Number(cid));
    if (!cart) {
    return res.status(404).send({ message: 'Carrito no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product === Number(pid));
    if (productInCart) {
        productInCart.quantity += 1; 
    } else {
        cart.products.push({ product: Number(pid), quantity: 1 }); 
    }
    await fs.promises.writeFile(pathToCarts, JSON.stringify(carts, null, '\t'));

    res.status(200).send({ message: 'Producto agregado al carrito' });
});