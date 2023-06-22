require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sessions = require('express-session')
const routes = require('./routes')

const app = express()

app.use(cors({
    origin: 'https://ecom-pvir.onrender.com',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}))

app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 360000, secure: false },
    resave: false
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes)

module.exports = app;