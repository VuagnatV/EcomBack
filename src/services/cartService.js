const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCartItem = async (userId, productId) => {
    try {
        const cartItem = await prisma.CartItem.findUnique({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })
        return cartItem
    } catch (error) {
        throw new Error(error);
    }
}

const getUserCart2 = async (userId) => {
    try {
        const products = await prisma.product.findMany({

            include: {
                CartItem: {
                    where: {
                        userId
                    }
                }
            }
        })
        return products
    } catch (error) {
        throw new Error(error);
    }
}

const getUserCart = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: {
                    select: {
                        product: true
                    }
                }
            }
        });

        const products = user.cart.map(({ product }) => {
            return product
        })

        return products;
    } catch (error) {
        throw new Error("Failed to retrieve user cart");
    }
}

const updateUserCart = async (userId, productId) => {
    try {
        const updatedUser = await prisma.user.update(
            {
                where: { id: userId },
                data: {
                    cart: {
                        create: {
                            product: {
                                connect: {
                                    id: productId
                                }
                            }
                        }
                    }
                }
            });
        return prisma.user.findMany({
            include: { cart: true }
        });
    } catch (error) {
        console.log(error)
        throw new Error('Failed to update user');
    }
};

const deleteCartItem = async (userId, productId) => {
    try {
        await prisma.CartItem.delete({
            where: {
                userId_productId: {
                    userId,
                    productId
                }
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete cart item');
    }
}

const deleteCart = async (userId) => {
    try {
        await prisma.CartItem.deleteMany({
            where: {
                userId
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to delete the cart');
    }
}

module.exports = {
    updateUserCart,
    getCartItem,
    getUserCart,
    deleteCartItem,
    deleteCart,
}