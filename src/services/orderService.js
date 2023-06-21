const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createOrderFromCart = async (userId, cart) => {


    let total = 0
    cart.map((product) => {
        total = total + product.price
    })

    try {
        await prisma.order.create({
            data: {
                total,
                user: {
                    connect: {
                        id: userId
                    }
                },
                orderItems: {
                    create:
                        cart.map((cartItem) => ({
                            product: {
                                connect: { id: cartItem.id }
                            }
                        }))
                }
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error('Failed to create order');
    }
}

const getAllOrders = async (userId) => {
    try {
        const orders = prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: { product: true }
                }
            }
        })
        return orders
    } catch (error) {
        console.log(error)
        throw new Error('Failed to retrive order');
    }
}

module.exports = {
    createOrderFromCart,
    getAllOrders,
}