module.exports = function (Bookmark) {

    Bookmark.getBookmarks = function (query) {
        return Bookmark.find({
            include: {
                relation: 'user',
                scope: {
                    fields: ['email', 'username']
                }
            }, where: query
        });
    };

    //Bookmark.getPublicViewBookmarks = function () {
    //    var self = this;
    //    var query = {private: false};
    //    return self.getBookmarks(query)
    //        .then(function(results) {
    //            return new Promise(function(resolve, reject) {
    //                var bookmarks = [];
    //                results.map(function (result) {
    //                    bookmarks.push(result.toJSON());
    //                });
    //                resolve(bookmarks);
    //            })
    //        });
    //};
    //
    //Bookmark.getUserViewBookmarks = function () {
    //    var self = this;
    //    var query = { or: [{owner: req.user.id}, {private: false}] };
    //    return self.getBookmarks(query)
    //        .then(function(results) {
    //            return new Promise(function(resolve, reject) {
    //                var bookmarks = [];
    //                results.map(function (result) {
    //                    bookmarks.push(result.toJSON());
    //                });
    //                resolve(bookmarks);
    //            })
    //        });
    //};

};
