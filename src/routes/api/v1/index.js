const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const authenticationRoutes = require('./authenticationRoutes')
const cartRoutes = require('./cartRoutes')
const orderRoutes = require('./orderRoutes')

const isLoggedIn = require('../../../middlewares/isLoggedIn');
const isAdmin = require('../../../middlewares/isAdmin')

router.use('/authentication', authenticationRoutes)
router.use('/users', isAdmin, userRoutes)
router.use('/product', isAdmin, productRoutes)
router.use('/cart', isLoggedIn, cartRoutes)
router.use('/order', isLoggedIn, orderRoutes)

module.exports = router