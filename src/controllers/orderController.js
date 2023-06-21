const orderService = require('../services/orderService')

const createOrderFromCart = async (req, res) => {
    const { id } = req.params;
    const cart = req.body

    try {
        const order = await orderService.createOrderFromCart(parseInt(id), cart)
        return res.status(200).json({ status: "order placed" })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getAllOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await orderService.getAllOrders(parseInt(id))
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    createOrderFromCart,
    getAllOrders,
}