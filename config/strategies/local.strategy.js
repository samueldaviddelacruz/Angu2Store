var passport = require('passport');

var authDAL = require('../../DAL/AuthDAL');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {

            authDAL.verifyUser(username, password, done);
            // mongodb.connect(mongoUrl, function (err, db) {
            //     var collection = db.collection('usuariosLibrary');
            //     collection.findOne({ username: username }, function (err, results) {
            //         if (results.password === password) {
            //             var user = results;
            //             done(null, user);
            //         } else {
            //             done(null, false,{message:'Bad Password'});
            //         }
            //
            //     });
            // });


        }
    ));

};
