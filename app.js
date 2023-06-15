const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())


app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

module.exports = app;