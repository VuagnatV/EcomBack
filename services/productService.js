// productService.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createProduct(data) {
    try {
        const product = await prisma.product.create({ data });
        return product;
    } catch (error) {
        throw new Error('Failed to create product.');
    }
}

async function getProductById(id) {
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        return product;
    } catch (error) {
        throw new Error('Failed to retrieve product.');
    }
}

async function getAllProducts() {
    try {
        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        throw new Error('Failed to retrieve product.');
    }
}

async function updateProduct(id, data) {
    try {
        const product = await prisma.product.update({ where: { id }, data });
        return product;
    } catch (error) {
        throw new Error('Failed to update product.');
    }
}

async function deleteProduct(id) {
    try {
        await prisma.product.delete({ where: { id } });
        return true;
    } catch (error) {
        throw new Error('Failed to delete product.');
    }
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
};
