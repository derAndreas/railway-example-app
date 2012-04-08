Chapter.belongsTo(Book, {as: 'book', foreignKey: 'bookId'});

Chapter.validatesPresenceOf('title', {message: 'badly required'});

Chapter.prototype.toString = function () {
    return this.title;
};

