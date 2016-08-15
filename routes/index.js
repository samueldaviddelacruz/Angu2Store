var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../config/Authentication/Middleware');

/* GET home page. */

//added the :angular to trick the router to threat angular routes as just a parameter after the /,
//this way it doesn't block other routes like API/ETC routes
router.get('/', AuthMiddleware.ensureAuthenticated, function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/productDetail/:id', AuthMiddleware.ensureAuthenticated, function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/:angular', AuthMiddleware.ensureAuthenticated, function (req, res, next) {
    res.render('index', {title: 'Express'});
});


module.exports = router;
