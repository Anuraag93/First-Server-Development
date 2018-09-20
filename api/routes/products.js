const express = require('express')
const router = express.Router();

const mongoose = require('mongoose')


const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log('From Database' + doc)
            res.status(200).json({
                count: doc.length,
                product: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        });
});


router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'product was created',
                productInfo: product
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })


});

router.get('/:productId', (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'product info GET via Id',
                    // productId: id,
                    product: doc

                });
            }
            else {
                res.status(404).json({
                    message: 'no record found for product Id ' + id
                })
            }
        })
        .catch(err => {
            console.log('from databse ' + err)
            res.status(500).json({
                error: err
            })
        })

});


router.delete('/:productId', (req, res, next) => {
    Product.remove({ _id: req.params.productId })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Product deleted',
                productId: req.params.productId,

                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/product',
                    body: { name: 'String', price: 'Number' }
                }


            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.patch('/:productId', (req, res, next) => {
    Product.update({ _id: req.params.productId }, { $set: { name: req.body.newName, price: req.body.newPrice } })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Product Updated',
                product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

});

module.exports = router;