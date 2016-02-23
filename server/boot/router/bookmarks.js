/**
 * Module dependencies
 */

var express = require('express');


/**
 * Module export
 */

module.exports = Bookmarks;


/**
 * Bookmarks App
 *
 * @param app
 * @constructor
 * @public
 */
function Bookmarks(app) {

    var router = app.loopback.Router();
    var User = app.models.User;
    var Bookmark = app.models.bookmark;

    // check authenticate
    router.all(function (req, res, next) {
        if (req.user === undefined) {  // if user are login, the req.user is undefined
            res.redirect('/login');
        }
        next();
    });

    router.get('/newBookmark', function (req, res) {
        res.render('newBookmark', {user: req.user});
    });

    router.post('/newBookmark', function (req, res) {
        User.findById(req.user.id)
            .then(function(user) {
                req.body.createTime = Date.now();
                return user.bookmarks.create(req.body);
            })
            .then(function(result) {
                res.redirect('/');
            })
            .catch(function(err) {
                console.log(err);
                res.redirect('/');
            });
    });

    router.get('/bookmark/:id', function (req, res) {
        Bookmark.findById(req.params.id)
            .then(function(bookmark) {
                res.render('bookmark', {bookmark: bookmark, user: req.user});
            })
            .catch(function() {
                console.log(err);
                res.redirect('/');
            });
    });

    router.post('/bookmark', function (req, res) {
        req.body.createTime = Date.now();
        Bookmark.getBookmarks({ id: req.body.id })
            .then(function(result) {
                return result[0].updateAttributes(req.body);
            })
            .then(function(result) {
                res.redirect('/');
            })
            .catch(function(err) {
                console.log(err);
                res.redirect('/');
            });
    });

    router.get('/delete/:id', function (req, res) {
        Bookmark.destroyById(req.params.id)
            .then(function() {
                res.redirect('/');
            })
            .catch(function(err) {
                console.log(err);
                res.redirect('/');
            });
    });

    app.use(router);

}



