exports.routes = function (map) {
    map.resources('chapter');
    map.resources('books', function (book) {
        book.resources('chapters');
    });

    map.get('/', 'main#index');
    map.get('/login', 'main#login');
    map.post('/Login', 'main#login');
    map.get('/logout', 'main#logout');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};