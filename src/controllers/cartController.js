const cartService = require("../services/cartService")

const getUserCart = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await cartService.getUserCart(parseInt(id));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

/*const getCartItem = async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;

    try {
        const cartItem = await cartService.getCartItem(parseInt(id), parseInt(productId))
    }
}*/

const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        await cartService.deleteCartItem(parseInt(userId), parseInt(productId))
        res.status(200).json({ status: "cart item deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete cart item' });
    }
}

const deleteCart = async (req, res) => {
    const { id } = req.params;

    try {
        await cartService.deleteCart(parseInt(id))
        res.status(200).json({ status: "cart deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete the cart' });
    }
}

const updateUserCart = async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;

    try {
        const cartItem = await cartService.getCartItem(parseInt(id), parseInt(productId))

        if (cartItem) {
            return res.status(404).json({ error: 'Item aleready in the cart' });
        }

        const updatedUser = await cartService.updateUserCart(parseInt(id), parseInt(productId));

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
};

module.exports = {
    getUserCart,
    updateUserCart,
    deleteCartItem,
    deleteCart,
}