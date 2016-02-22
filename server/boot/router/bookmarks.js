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
        User.findById(req.user.id, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                user.bookmarks.create(req.body, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/');
                });
            }
        });
    });

    router.get('/bookmark/:id', function (req, res) {
        Bookmark.findById(req.params.id, function (err, bookmark) {
            res.render('bookmark', {bookmark: bookmark, user: req.user});
        });
    });

    router.post('/bookmarks', function (req, res) {
        Bookmark.upsert(req.body, function (err, result) {
            res.redirect('/');
        });
    });

    router.get('/delete/:id', function (req, res) {
        Bookmark.destroyById(req.params.id, function (err) {
            Bookmark.find({where: {or: [{owner: req.user ? req.user.id : null}, {private: false}]}}, function (err, bookmark) {
                res.redirect('/');
            });
        });
    });

    app.use(router);

}



