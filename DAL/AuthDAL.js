var mongoose = require('mongoose');
var hasher = require('../config/Authentication/hasher');

(function (module) {
    var UserSchema = mongoose.Schema({
        name: String,
        username: String,
        email: String,
        passwordHash: String,
        salt: String,
        Cart: Array
    }, {collection: 'StoreUsers'});


    var UserModel = mongoose.model('StoreUsers', UserSchema);
    module.AddUser = function (newUserData, callback) {

        var user = new UserModel(getNewUserData(newUserData));

        UserModel.findOne({email: user.email}, function (err, user) {
            if (user)
                return callback(new Error('User with that email already in registered'), null);

            user.save(callback);

        });

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

    module.addProductToCart = function (user, product, callback) {


        UserModel.findOne({email: user.email, "Cart.productId": product.productId}, function (err, returnedUser) {
            if (returnedUser) {

                UserModel.update({
                    email: returnedUser.email,
                    "Cart.productId": product.productId
                }, {$inc: {"Cart.$.quantity": 1}}, {upsert: true, runValidators: true}, callback);

            } else {
                var productData = {

                    productId: product.productId,
                    productName: product.productName,
                    quantity: 1,
                    imageUrl: product.imageUrl,
                    price: product.price
                };
                UserModel.update({email: user.email}, {$addToSet: {Cart: productData}}, {
                    upsert: true,
                    runValidators: true
                }, callback);
            }

        });

    }

    module.updateCart = function (user, cart, callback) {

        UserModel.update({email: user.email}, {Cart: cart}, {
            upsert: true,
            runValidators: true
        }, callback);

    };

    module.removeProductFromCart = function (user, product, callback) {

        UserModel.update({
            email: user.email,
            "Cart.productId": product.productId
        }, {$pull: {Cart: {productId: product.productId}}}, {upsert: true, runValidators: true}, callback);

    }

    module.getUserCart = function (user, callback) {
        UserModel.findOne({email: user.email}, 'Cart', function (err, cart) {
            if (err) {
                return callback(err, null);
            }
            callback(null, cart);

        })

    }

}(module.exports) );