// productController.js

const productService = require('../services/productService');

async function createProduct(req, res) {
    try {
        const { name, description, price, quantity, categoryId } = req.body;
        const product = await productService.createProduct({
            name,
            description,
            price,
            quantity,
            categoryId,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(parseInt(id));
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, categoryId } = req.body;
        const product = await productService.updateProduct(parseInt(id), {
            name,
            description,
            price,
            quantity,
            categoryId,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        await productService.deleteProduct(parseInt(id));
        res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
