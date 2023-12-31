const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authenticationRoutes = require('./authenticationRoutes')
const cartRoutes = require('./cartRoutes')
const orderRoutes = require('./orderRoutes')

const isLoggedIn = require('../../../middlewares/isLoggedIn');

router.use('/authentication', authenticationRoutes)
router.use('/users', isLoggedIn, userRoutes)
router.use('/product', productRoutes)
router.use('/cart', isLoggedIn, cartRoutes)
router.use('/order', isLoggedIn, orderRoutes)

module.exports = router