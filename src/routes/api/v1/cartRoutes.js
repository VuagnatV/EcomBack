const express = require('express');
const router = express.Router();
const cartController = require('../../../controllers/cartController')
const isLoggedIn = require('../../../middlewares/isLoggedIn');


router.get('/:id', cartController.getUserCart);

router.put('/:id', cartController.updateUserCart);

router.delete('/:userId/:productId', cartController.deleteCartItem)

router.delete('/:id', cartController.deleteCart)


module.exports = router;