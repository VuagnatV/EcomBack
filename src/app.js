require('dotenv').config()

const RedisStore = require("connect-redis").default
const express = require('express')
const cors = require('cors')
const sessions = require('express-session')
const routes = require('./routes')
const redis = require('redis')
const app = express()

let redisClient = redis.createClient({ url: 'redis://red-ci9qm5mnqql8alnj93a0:6379' })
redisClient.connect().catch(console.error)

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "ecom:",
})

app.use(cors({
    origin: 'https://ecom-pvir.onrender.com',
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
    //preflightContinue: true,
}))

app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    store: redisStore,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
}));

app.enable('trust proxy')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes)

module.exports = app;