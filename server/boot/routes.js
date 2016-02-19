/**
 * Created by roger on 2/17/16.
 */

var path = require('path');

module.exports = function (app) {

    var router = app.loopback.Router();

    var User = app.models.User;
    var Bookmark = app.models.bookmark;

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
            console.log(results);
            results.map(function(result){
                bookmarks.push(result.toJSON());
            });
            res.render('home', {bookmarks: bookmarks, user: req.user});
        });
    });

    router.post('/regist', function (req, res, next) {
        var user = req.body;
        user.emailVerified = true;
        User.create(user, function (err, user) {

            if (err) {
                res.send(err);
                return;
            }

            req.login(user, function (err) {
                if (err) {
                    return res.redirect('/login');
                }
                return res.redirect('/');
            })
        });
    });

    // check authenticate
    router.all(function (req, res, next) {
        if (req.user === undefined) {  // if user are login, the req.user is undefined
            res.redirect('/login');
        }
        next();
    });

    app.use(router);

    //require(path.resolve(__dirname, 'router/bookmarks.js'))(app);
};
