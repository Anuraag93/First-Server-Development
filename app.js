const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');



mongoose.connect('mongodb+srv://admin:'
    + process.env.MONGO_PWD
    + '@node-rest-shop-64ur7.mongodb.net/test?retryWrites=true', 
    {
        useNewUrlParser: true
    })

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-with,Content-Type, Accept, Authorization")

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH')
        return res.status(200).json({
            message: 'setting up cors'
        })
    }
    next()

})

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            messsage: error.message
        }
    })
})

module.exports = app;