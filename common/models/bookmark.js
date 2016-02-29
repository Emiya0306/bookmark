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

};
