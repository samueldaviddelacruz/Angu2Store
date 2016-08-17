/**
 * Created by samuel on 8/16/16.
 */

var mongoose = require('mongoose');
(function (module) {

    var OrderSchema = mongoose.Schema({
        shippingDetails: {},
        CreditCardDetail: {},
        orderTotal: Number,
        orderedItems: []

    }, {collection: 'ProductOrders'});

    var OrderModel = mongoose.model('ProductOrders', OrderSchema);


    module.placeOrder = function (neworder, callback) {

        var order = new OrderModel(neworder);

        order.save(callback);

    }



}(module.exports));
