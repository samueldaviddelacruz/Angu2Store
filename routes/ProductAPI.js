/**
 * Created by samuel on 8/10/16.
 */
var express = require('express');
var db = require('../DAL/ProductsDAL');
var router = express.Router();
var AuthMiddleware = require('../config/Authentication/Middleware');


router.put('/updateProductQuantity', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var updatedProd = req.body;

    updatedProd.Quantity -= 1;
    db.module.updateProductQuantity(updatedProd, function (err, product) {
        if (err) return res.send(err);

        res.send(updatedProd);

    });

});


/* GET single product. */
router.get('/singleProduct', AuthMiddleware.ensureApiAuthenticated, function (req, res) {

    console.log('productId' + req.query.productId)
    db.getSingleProduct(req.query.productId, function (err, product) {
        if (err) return res.send(err);

        res.send(product);

    });

});


router.post('/newProductReview', AuthMiddleware.ensureApiAuthenticated, function (req, res) {

    var updatedProd = req.body;
    db.updateProductReviews(updatedProd, function (err, product) {

        console.log(updatedProd)
        if (err) return res.send(err);

        res.send(updatedProd);

    });

});

/* GET products listing. */
router.get('/products', AuthMiddleware.ensureApiAuthenticated, function (req, res) {


    db.getAllProducts(function (err, products) {
        if (err) return res.send(err);

        res.send(products);

    });

});

module.exports = router;