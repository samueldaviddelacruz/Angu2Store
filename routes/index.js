var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../config/Authentication/Middleware');

/* GET home page. */

//added the :angular to trick the router to threat angular routes as just a parameter after the /,
//this way it doesn't block other routes like API/ETC routes
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', user: req.user});
});

router.get('/productDetail/:id', function (req, res, next) {
    res.render('index', {title: 'Express', user: req.user});
});
router.get('/:angular', function (req, res, next) {
    res.render('index', {title: 'Express', user: req.user});
});


module.exports = router;
