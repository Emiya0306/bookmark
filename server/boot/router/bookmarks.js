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

  router.all(ensureLoggedIn);
  //router.get('/bookmarks', getBookmarks);
  router.get('/bookmarks/new', getCreateBookmark);
  router.post('/bookmarks', createBookmark);
  router.get('/bookmarks/:id/edit', getEditBookmark);
  router.post('/bookmarks/:id', updateBookmark);
  router.delete('/bookmarks/:id', deleteBookmark);

  app.use(router);


  // check authenticate
  function ensureLoggedIn(req, res, next) {
    if (req.user === undefined) {  // if user are login, the req.user is undefined
      res.redirect('/login');
    }
    next();
  }

  function getCreateBookmark(req, res) {
    res.render('newBookmark', {user: req.user});
  }

  function createBookmark(req, res) {
    User.findById(req.user.id)
      .then(function (user) {
        req.body.createTime = Date.now();
        return user.bookmarks.create(req.body);
      })
      .then(function (result) {
        res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/');
      });
  }

  function getEditBookmark(req, res) {
    Bookmark.findById(req.params.id)
      .then(function (bookmark) {
        res.render('bookmark', {bookmark: bookmark, user: req.user});
      })
      .catch(function () {
        console.log(err);
        res.redirect('/');
      });
  }

  function updateBookmark(req, res) {
    req.body.createTime = Date.now();
    Bookmark.getBookmarks({id: req.params.id})
      .then(function (result) {
        return result[0].updateAttributes(req.body);
      })
      .then(function (result) {
        res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/');
      });
  }

  function deleteBookmark(req, res) {
    Bookmark.destroyById(req.params.id)
      .then(function () {
        res.redirect('/');
      })
      .catch(function (err) {
        console.log(err);
        res.redirect('/');
      });
  }

}



