/**
 * Created by samuel on 8/15/16.
 */


(function (AuthMiddleware) {


    AuthMiddleware.ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/users/login');
        }
    };

    AuthMiddleware.ensureApiAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {

            res.send(401, "Not authorized")
        }
    };

}(module.exports))
