const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/orderController')
const isLoggedIn = require('../../../middlewares/isLoggedIn');

router.post('/:id', orderController.createOrderFromCart)

router.get('/:id', orderController.getAllOrders)

module.exports = router;