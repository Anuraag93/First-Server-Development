const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handling GET request to /orders'
    });
});


router.post('/', (req, res, next) => {
    const Order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'orders was created',
        order: Order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message : 'order info GET via Id',
        orderId: req.params.orderId

    });
});


router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted',
        orderId: req.params.orderId
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order updated',
        orderId: req.params.orderId
    });
});

module.exports = router;