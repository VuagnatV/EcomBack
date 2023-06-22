require('dotenv').config()

const RedisStore = require("connect-redis").default
const express = require('express')
const cors = require('cors')
const sessions = require('express-session')
const routes = require('./routes')
const redis = require('redis')
const app = express()

let redisClient = createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "ecom:",
})

app.use(cors({
    origin: 'https://ecom-pvir.onrender.com',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}))

app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 360000, secure: true },
    resave: false,
    store: redisStore
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes)

module.exports = app;