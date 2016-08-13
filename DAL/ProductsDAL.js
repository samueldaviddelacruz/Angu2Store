/**
 * Created by samuel on 8/12/16.
 */
var mongoose = require('mongoose');
var mongoUrl = "mongodb://ingsamy:mega007@ds059519.mongolab.com:59519/mongolabdb";


(function (module) {

    mongoose.connect(mongoUrl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function () {
        console.log('connected to mongo');
        var ProductSchema = mongoose.Schema({
            productId: Number,
            productName: String,
            productCode: String,
            releaseDate: String,
            description: String,
            price: Number,
            starRating: Number,
            imageUrl: String,
            starsArray: [],
            Quantity: Number,
            Reviews: []

        }, {collection: 'Products'});

        ProductSchema.path('Quantity').validate(function (value) {
            console.log('my value :' + this.Quantity);
            if (this.Quantity < 0) {
                return false;
            }
            return true;
        }, 'Out of stock!');

        var Product = mongoose.model('Products', ProductSchema);

        module.getAllProducts = function (callback) {

            Product.find(callback);

        };


        module.updateProductQuantity = function (product, callback) {

            var prod = new Product(product);

            var validationError = prod.validateSync();
            console.log(validationError);
            if (validationError) {
                return callback(validationError, null);
            }

            var query = {"productId": product.productId};

            Product.findOneAndUpdate(query, product, {upsert: true, runValidators: true}, callback);

        }


    });


}(module.exports));

