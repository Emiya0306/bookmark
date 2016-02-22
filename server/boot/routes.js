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

        var query = req.user ? {or: [{owner: req.user.id}, {private: false}]} : { private: false};

        Bookmark.find({
            include: {
                relation: 'user',
                scope: {
                    fields: ['email', 'username']
                }
            }, where: query
        }, function (err, results) {
            // results has package some methods. We need to change it into json object.
            var bookmarks = [];
            results.map(function(result){
                bookmarks.push(result.toJSON());
            });
            res.render('home', {bookmarks: bookmarks, user: req.user});
        });
    });

    app.use(router);
};
