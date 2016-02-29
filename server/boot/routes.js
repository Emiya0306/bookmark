"use strict";
var moment = require('moment');

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
                var bookmarks = results.map(function(result) {
                  result = result.toJSON();
                  result.createTime = moment(result.createTime).format("MMM DD YYYY");
                  return result;
                });

                res.render('home_new', {bookmarks, user: req.user});

            })
            .catch(function(error) {
                res.render("error", {error})
            });

    });

    app.use(router);
};
