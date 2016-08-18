var express = require('express');
var router = express.Router();
var authDal = require('../DAL/AuthDAL');
var passport = require('passport');
var mailHelper = require('../helpers/mailhelper');
/* GET users listing. */
router.post('/register', function (req, res, next) {

    authDal.AddUser(req.body, function (err, obj) {
        console.log(err)
        if (err) {
            return res.render('register', {error: err.message});
        } else {
            return res.render('register', {success: "User registered, please log in"});
        }
    });

});

router.get('/register', function (req, res) {


    res.render('register');

});

router.get('/login', function (req, res) {

    console.log();
    var error = req.flash('error')[0];
    res.render('login', {error: error});

});

router.get('/logout', function (req, res) {

    req.logout();
    res.redirect('/users/login');

});

router.post('/login', passport.authenticate('local', {
        failureRedirect: '/users/login',
        failureFlash: true
    }), function (req, res) {
        res.redirect('/');
    }
);




module.exports = router;
