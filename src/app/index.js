import express from 'express';
import { CartsRouter, ProductsRouter } from '../routes/index.js';
import { config } from '../config/index.js';


const initApp = () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api/products', ProductsRouter);
    app.use('/api/carts', CartsRouter);
    
    console.log(config.dirname);
    
    return app;
}

export default initApp