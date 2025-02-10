import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';
import { validateInputProducts } from "../middlewares/validacionMiddlewares.js";

export const ProductsRouter = Router()

const pathToProducts = path.join(config.dirname, '/src/data/products.json');

ProductsRouter.get('/', async (req, res) => {
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
    const products = JSON.parse(productsString);
    const product = products.find(p => p.id === id);

    if (!product){
        return res.status(404).send({message: 'Producto inexistente'})
    }
    res.send({ product })
})

ProductsRouter.post('/', validateInputProducts, async (req, res) => {
    
    let productsString = await fs.promises.readFile(pathToProducts, 'utf-8')
    const products = JSON.parse(productsString)

    const id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    } = req.body
    
    const product = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    }
    products.push(product)

    const productsStringified = JSON.stringify(products, null, '\t')
    await fs.promises.writeFile(pathToProducts, productsStringified)
    res.status(201).send({
        mensaje: 'Producto creado exitosamente',
        data: product
    });
})
ProductsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
    const products = JSON.parse(productsString);

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send({ mensaje: "Producto no encontrado" });
    }

    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    } = req.body;

    products[productIndex] = {
        ...products[productIndex],
        title: title ?? products[productIndex].title,
        description: description ?? products[productIndex].description,
        code: code ?? products[productIndex].code,
        price: price ?? products[productIndex].price,
        status: status ?? products[productIndex].status,
        stock: stock ?? products[productIndex].stock,
        category: category ?? products[productIndex].category,
        thumbnails: thumbnails ?? products[productIndex].thumbnails,
    };

    const productsStringified = JSON.stringify(products, null, "\t");
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.status(200).send({
        mensaje: "Producto actualizado exitosamente",
        data: products[productIndex],
    });
});

ProductsRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
    const products = JSON.parse(productsString);

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).send({ mensaje: "Producto no encontrado" });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    const productsStringified = JSON.stringify(products, null, "\t");
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.status(200).send({
        mensaje: "Producto eliminado exitosamente",
        data: deletedProduct,
    });
});