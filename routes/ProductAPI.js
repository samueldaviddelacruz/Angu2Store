/**
 * Created by samuel on 8/10/16.
 */
var express = require('express');
var productsDAL = require('../DAL/ProductsDAL');
var OrdersDal = require('../DAL/OrdersDAL');
var AuthDal = require('../DAL/AuthDAL');
var router = express.Router();
var AuthMiddleware = require('../config/Authentication/Middleware');


router.put('/updateProductQuantity', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var updatedProd = req.body;

    updatedProd.Quantity -= 1;
    productsDAL.module.updateProductQuantity(updatedProd, function (err, product) {
        if (err) return res.send(err);

        res.send(updatedProd);

    });

});


/* GET single product. */
router.get('/singleProduct', function (req, res) {

    console.log('productId' + req.query.productId)
    productsDAL.getSingleProduct(req.query.productId, function (err, product) {
        if (err) return res.send(err);

        res.send(product);

    });

});


router.post('/newProductReview', AuthMiddleware.ensureApiAuthenticated, function (req, res) {

    var prodId = req.body.prodId;
    var newReview = req.body.newReview;
    newReview.PostedBy = req.user.name;

    productsDAL.updateProductReviews(prodId, newReview, function (err, result) {

        console.log(result)
        if (err) return res.send(err);

        productsDAL.getSingleProduct(prodId, function (err, product) {
            console.log(product);
            res.send(product);
        });


    });

});

router.post('/addProductToCart', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var product = req.body;

    AuthDal.addProductToCart(req.user, product, function (err, result) {

        console.log(result);
        if (err) return res.send(err);

        res.send(product);

    })

});


router.post('/removeFromCart', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var product = req.body;

    AuthDal.removeProductFromCart(req.user, product, function (err, result) {

        console.log(result);
        if (err) return res.send(err);

        res.send(product);

    })

});

router.put('/updateCart', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var cart = req.body;

    AuthDal.updateCart(req.user, cart, function (err, result) {

        console.log(result);
        if (err) return res.send(err);

        res.send(cart);

    })

});


router.post('/newOrder', AuthMiddleware.ensureApiAuthenticated, function (req, res) {
    var order = req.body;
    var emptyCart = [];
    order.shippingDetails.email = req.user.email;

    AuthDal.updateCart(req.user, emptyCart, function (err, result) {

        console.log(result);
        if (err) return res.send(err);

        OrdersDal.placeOrder(order, function (err, result) {
            if (err)
                return res.send(err);
            return res.send(result);

            //implement email send functionality
        })

    })


});

router.get('/userCart', AuthMiddleware.ensureApiAuthenticated, function (req, res) {

    AuthDal.getUserCart(req.user, function (err, cart) {

        console.log(cart);
        if (err) return res.send(err);
        res.send(cart);

    })

});

/* GET products listing. */
router.get('/products', function (req, res) {


    productsDAL.getAllProducts(function (err, products) {
        if (err) return res.send(err);

        res.send(products);

    });

});

module.exports = router;