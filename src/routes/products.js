import { Router } from "express";
//import fs from 'fs';
//import path from 'path';
//import { config } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';
import { validateInputProducts } from "../middlewares/validacionMiddlewares.js";
import { Product } from "../models/product.model.js";

export const ProductsRouter = Router()

//const pathToProducts = path.join(config.dirname, '/src/data/products.json');

ProductsRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const filter = query ? { category: query } : {};
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
        };

        const products = await Product.paginate(filter, options);
        res.send(products);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos', error });
    }
});

ProductsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send({ message: 'Producto inexistente' });
        }

        res.send({ product });
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el producto', error });
    }
});

ProductsRouter.post('/', validateInputProducts, async (req, res) => {
    try {
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
        } = req.body;

        const product = new Product({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        });

        await product.save();
        res.status(201).send({
            mensaje: 'Producto creado exitosamente',
            data: product
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear el producto', error });
    }
});

ProductsRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

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

        const product = await Product.findByIdAndUpdate(
            id,
            {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).send({ message: 'Producto inexistente' });
        }

        res.status(200).send({
            mensaje: 'Producto actualizado exitosamente',
            data: product,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al actualizar el producto', error });
    }
});

ProductsRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({ message: 'Producto inexistente' });
        }

        res.status(200).send({
            mensaje: 'Producto eliminado exitosamente',
            data: product,
        });
    } catch (error) {
        res.status(500).send({ message: 'Error al eliminar el producto', error });
    }
});