export const validateInputProducts = (req, res, next) => {
    try {
        console.log('Entra al middleware de validacion');
        const producto = req.body;
        if (!producto.title || !producto.price || !producto.category) {
        return res.status(400).send({
        mensaje: 'Error al crear el producto',
        error: 'Parámetros incompletos.',
        });
    }
    next();
    } catch (error) {
        console.error('Error en el middleware de validación:', error);
        res.status(500).send({mensaje: 'Error interno del servidor',
        error: error.message,
        });
    }
};

/*export const validateCreateCart = (req, res, next) => {
    try {
        const { id, timestamp, products } = req.body;
        if (!id || !timestamp || !Array.isArray(products)) {
            return res.status(400).send({
                message: 'Datos del carrito incorrectos. Asegúrate de enviar un ID, un timestamp y una lista de productos.'
            });
        }
    next();
    } catch (error) {
        res.status(500).send({
            message: 'Error al validar los datos del carrito',
            error,
        });
    }
};*/
export const validateCreateCart = (req, res, next) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products)) {
            return res.status(400).send({
                message: 'El carrito debe contener una lista de productos válida.'
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: 'Error al validar los datos del carrito',
            error,
        });
    }
};
