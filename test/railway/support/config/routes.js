exports.routes = function (map) {
    map.resources('posts');     // for basic route testing
    map.resources('posts', {path : 'postings'});
    map.resources('posts', {as: 'articles'});

    map.get('/pathtohelper', 'posts#pathtohelper'); // for path_to tests and "as" routes tests

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};