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
 * @param server
 * @constructor
 * @public
 */
function Bookmarks(Router) {

    Router.get('/newBookmark', function (req, res) {
        if (req.user) {
            res.render('newBookmark', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });

    Router.post('/newBookmark', function (req, res) {
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

    Router.get('/bookmark/:id', function (req, res) {
        if (req.user) {
            Bookmark.findById(req.params.id, function (err, bookmark) {
                res.render('bookmark', {bookmark: bookmark, user: req.user});
            });
        } else {
            res.redirect('/login');
        }
    });

    Router.post('/bookmarks', function (req, res) {
        if (req.user) {
            Bookmark.upsert(req.body, function (err, result) {
                res.redirect('/');
            });
        } else {
            res.redirect('/login');
        }
    });

    Router.get('/delete/:id', function (req, res) {
        Bookmark.destroyById(req.params.id, function (err) {
            Bookmark.find({where: {or: [{owner: req.user ? req.user.id : null}, {private: false}]}}, function (err, bookmark) {
                res.redirect('/');
            });
        });
    });

}



