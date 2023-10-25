const Products = require("../model/product.model");


async function obtenerTodosLosProductos(req, res) {
    try {
        const products = await Products.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            error: error.message
        });
    }
}

async function crearProducto(req, res) {
    try {
        const dataProducts = req.body;
        await Products.sync();
        const createProduct = await Products.create({
            product_name: dataProducts.product_name,
            price: dataProducts.price,
            is_stock: dataProducts.is_stock,
            cantidad: dataProducts.cantidad,
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Producto cargado",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al crear el producto",
        });
    }
}


async function obtenerProductoPorID(req, res) {
    try {
        const id = req.params.product_id;
        const producto = await Products.findOne({
            where: {
                product_id: id,
            },
        });

        if (!producto) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: producto,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el producto",
        });
    }
}

async function actualizarProducto(req, res) {
    try {
        const id = req.params.product_id;
        const dataProducts = req.body;

        const [updateCount] = await Products.update(
            {
                product_name: dataProducts.product_name,
                price: dataProducts.price,
                is_stock: dataProducts.is_stock,
                cantidad: dataProducts.cantidad,
            },
            {
                where: {
                    product_id: id,
                },
            }
        );

        if (updateCount === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al actualizar el producto",
        });
    }
}

async function eliminarProducto(req, res) {
    try {
        const id = req.params.product_id_id;

        const deleteCount = await Products.destroy({
            where: {
                product_id: id,
            },
        });

        if (deleteCount === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: "Producto no encontrado",
            });
        }

        res.status(204).json({
            ok: true,
            status: 204,
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al eliminar el producto",
        });
    }
}



module.exports = {
    obtenerTodosLosProductos,
    crearProducto,
    obtenerProductoPorID,
    actualizarProducto,
    eliminarProducto
};

