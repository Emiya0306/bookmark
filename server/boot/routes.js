/**
 * Created by roger on 2/17/16.
 */

var path = require('path');

module.exports = function (app) {

    var router = app.loopback.Router();

    var User = app.models.User;
    var Bookmark = app.models.bookmark;

    // get home page
    router.get('/', function (req, res) {

        var PublicBookmarks = {or: [{ owner: req.user ? req.user.id : null }, {private: false}]};
        var UserBookmarks = { private: false };

        var query = req.user ? PublicBookmarks : UserBookmarks ;

        Bookmark.getBookmarks(query)
            .then(function(results) {
                // results has package some methods. We need to change it into json object.
                var bookmarks = [];
                results.map(function (result) {
                    bookmarks.push(result.toJSON());
                });
                res.render('home', {bookmarks: bookmarks, user: req.user});
            })
            .catch(function(err) {
                res.render("error", {error: err})
            });

        //if(req.user) {
        //    Bookmark.getUserViewBookmarks()
        //        .then(function(bookmarks) {
        //            res.render('home', {bookmarks: bookmarks, user: req.user});
        //        })
        //        .catch(function() {
        //
        //        })
        //} else {
        //    Bookmark.getPublicViewBookmarks()
        //        .then(function(bookmarks) {
        //            res.render('home', {bookmarks: bookmarks, user: req.user});
        //        })
        //        .catch(function() {
        //
        //        })
        //}

    });

    app.use(router);
};
