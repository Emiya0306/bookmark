/**
 * Created by roger on 2/17/16.
 */
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
        if (!req.user) {
            Bookmark.find({
                    include: {
                        relation: 'user',
                        scope: {
                            fields: ['email', 'username']
                        }
                    }
                }, function (err, bookmarks) {
                    // bookmarks has package some methods.
                    var results = JSON.parse(JSON.stringify(bookmarks));

                    res.render('home', {bookmarks: results, user: req.user});
                });
        } else {
            Bookmark.find({
                include: {
                    relation: 'user',
                    scope: {
                        fields: ['email', 'username']
                    }
                }, where: {or: [{owner: req.user.id}, {private: false}]}
            }, function (err, bookmarks) {
                var results = JSON.parse(JSON.stringify(bookmarks));

                res.render('home', {bookmarks: results, user: req.user});
            });
        }
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

    router.get('/newBookmark', function (req, res) {
        if (req.user) {
            res.render('newBookmark', {user: req.user});
        } else {
            res.redirect('/login');
        }
    });

    router.post('/newBookmark', function (req, res) {
        User.findById(req.user.id, function (err, user) {
            console.log(user);
            console.log(user.bookmarks);
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                user.bookmarks.create(req.body, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(result);
                    }
                    res.redirect('/');
                });
            }
        });
    });

    router.get('/bookmark/:id', function (req, res) {
        if (req.user) {
            Bookmark.findById(req.params.id, function (err, bookmark) {
                res.render('bookmark', {bookmark: bookmark, user: req.user});
            });
        } else {
            res.redirect('/login');
        }
    });

    router.post('/bookmarks', function (req, res) {
        if (req.user) {
            Bookmark.upsert(req.body, function (err, result) {
                res.redirect('/');
            });
        } else {
            res.redirect('/login');
        }
    });

    router.get('/delete/:id', function (req, res) {
        Bookmark.destroyById(req.params.id, function (err) {
            Bookmark.find({where: {or: [{owner: req.user ? req.user.id : null}, {private: false}]}}, function (err, bookmark) {
                res.redirect('/');
            });
        });
    });

    app.use(router);
};
