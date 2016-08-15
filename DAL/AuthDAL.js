var mongoose = require('mongoose');
var hasher = require('../config/Authentication/hasher');

(function (module) {
    var UserSchema = mongoose.Schema({
        name: String,
        username: String,
        email: String,
        passwordHash: String,
        salt: String
    }, {collection: 'StoreUsers'});


    var UserModel = mongoose.model('StoreUsers', UserSchema);

    module.AddUser = function (newUserData, callback) {

        var user = new UserModel(getNewUserData(newUserData));

        UserModel.findOne({email: user.email}, function (err, user) {
            if (user)
                return callback(new Error('User with that email already in registered'), null);

            user.save(callback);

        });

        // UserModel.save(user,callback);
    };


    var getNewUserData = function (user) {
        var salt = hasher.createSalt();
        return {
            name: user.name,
            email: user.email,
            username: user.username.toUpperCase(),
            passwordHash: hasher.computeHash(user.password, salt),
            salt: salt
        };
    };

    module.verifyUser = function (username, password, callback) {

        UserModel.findOne({username: username.toUpperCase()}, function (err, user) {

            if (!err && user) {
                var testHash = hasher.computeHash(password, user.salt);

                if (testHash === user.passwordHash) {

                    callback(null, user);

                } else {

                    callback(null, false, {
                        message: "Invalid Credentials"
                    });
                }

            } else {

                callback(null, false, {
                    message: "User " + username + " Doesnt Exists"
                });

            }

        });
    }


}(module.exports));