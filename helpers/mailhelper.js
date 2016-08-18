var nodemailer = require('nodemailer');
var fs = require('fs');
(function (mailHelper) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(
        'smtps://postmaster@sandbox1d0982eeba7243e8b4e6f4b0e1564dee.mailgun.org:ae308a9af3615f998d2a7c33a59898c8@smtp.mailgun.org');


    mailHelper.sendBillingMail = function (order, subject, to, callback) {

// send mail with defined transport object
        getHtmlBillingTemplate(order, function (html) {

            mailHelper.sendMail(subject, to, html, callback);

        })
    }

    mailHelper.sendMail = function (subject, to, htmlBody, callback) {
        transporter.sendMail(getMailOptions(subject, to, htmlBody), callback);
    }

    var getHtmlBillingTemplate = function (order, next) {

        fs.readFile(__dirname + '/billing.html', 'utf8', function (err, html) {

            var formatedHtml = billFormatter(order, html);
            next(formatedHtml);


        })

    };

    var billFormatter = function (order, html) {

        var listItems = "";
        for (var item of order.orderedItems) {
            console.log(item)
            var singleItem = ` <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                 <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" valign="top">${item.quantity + '-' + item.productName}</td>
                                 <td class="alignright" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top">${item.price * item.quantity}</td>
                                </tr>`
            listItems += singleItem;
        }


        return html.replace('{{orderedItems}}', listItems)

            .replace(/{{(total)}}/gi, '$' + order.orderTotal).replace('{{orderId}}', "Order ID: " + order._id)
            .replace('{{userName}}', order.shippingDetails.FirstName + " " + order.shippingDetails.LastName)
            .replace('{{date}}', new Date().toDateString());

    }

    function getMailOptions(subject, to, htmlBody) {
        var mailOptions = {
            from: '"Samysoft" <postmaster@sandbox1d0982eeba7243e8b4e6f4b0e1564dee.mailgun.org>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            //text: 'Hello world', // plaintext body
            html: htmlBody // html body
        };

        return mailOptions;
    }

}(module.exports))


// setup e-mail data with unicode symbols


