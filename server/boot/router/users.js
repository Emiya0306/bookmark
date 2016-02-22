/**
 * Module dependencies
 * @type {*|exports|module.exports}
 */
var express = require('express');

/**
 * Users App
 * @type {Users}
 */
module.exports = Users;

/**
 * Users App
 * @param app
 * @constructor
 */
function Users(app) {

    var router = app.loopback.Router();
    var User = app.models.User;
    var Bookmark = app.models.bookmark;

    router.post('/regist', function (req, res, next) {
        var user = req.body;
        user.emailVerified = true;
        user.confirm = undefined;
        User.create(user)
            .then(function (user) {
                return req.login(user, function (err, user) {
                    if (err) {
                        return res.redirect('/login');
                    }
                    return res.redirect('/');
                })
            })
            .catch(function (err) {
                console.log(err);
                req.flash('error', err.message);
                return res.redirect('/regist');
            });
    });

    // get login page
    router.get('/login', function (req, res) { // here are not router.post('/login'), because of password providers support login by itself
        res.render('login');
    });

    // get regist page
    router.get('/regist', function (req, res) {
        res.render('regist');
    });

    // get logout page
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/user/check', function (req, res, next) {
        var query = req.query;
        User.findOne({where: query})
            .then(function (user) {
                res.send(!user ? 'true' : 'false');
            })
            .catch(function (err) {
                req.flash('error', err.message);
                //return res.redirect('/regist');
            });
    });

    app.use(router);
}