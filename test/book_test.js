
var app     = require('../server'),
    tobi    = require('tobi'),
    browser = tobi.createBrowser(3001, '127.0.0.1');

app.listen(3001)

describe('GET /books *', function() {

    before(function(done) {
        app.models.Book.all({where: {name: 'Game of Throne'}}, function(err, result) {
            if(!result || (result && result.length == 0)) {
                Book.find(1, function(err, b) {
                    b.updateAttribute('name', 'Game of Throne', function(err, result) {
                        done()
                    });
                })
            }
        });
    });

    it('should validate the page elements', function(done) {
        browser.get('/books', function(res, $){
            res.should.have.status(200);
            $('title').should.have.text('Books:Books index');
            $('h1').should.have.text('My Books');
            $('a.btn.btn-primary').should.have.text(' Add Book');
            $('a[href="/books/1"]:not([data-remote])').should.have.text('Game of Thrones'); // not() because it would match the delete button too
            
            done();
        });
    });

    it('should load the first book and verify content', function(done) {
        browser.get('/books/1', function(res, $) {
            res.should.have.status(200);
            $('title').should.have.text('Books:Book show');
            $('h1').should.have.text('Details of book');
            $('table.table.table-bordered th').should.have.text('Name');
            $('table.table.table-bordered td').should.have.text('Game of Thrones');

            $('a.btn.btn-primary').should.have.text(' Edit').and.have.attr('href');
            $('a.btn.btn-primary').attr('href').should.eql('/books/1/edit')
            done();
        });
    });

    it('should load the edit page of the first book and verify content', function(done) {
        browser.get('/books/1/edit', function(res, $) {
            res.should.have.status(200);
            $('title').should.have.text('Books:Book edit');
            $('h1').should.have.text('Edit Book');
            $('form')
                .should.have.action('/books/1')
                .and.have.id('book_form')
                .and.have.method('POST')
                .and.have.many('input');

            $('form input#Book_name').should.have.attr('name', 'Book[name]');
            $('form input#Book_name').should.have.attr('value', 'Game of Thrones');
            $('form button[type="submit"]').should.have.text(' Update book');
            done();
        });
    });

    it('should edit the first book for the first time', function(done) {
        browser.get('/books/1/edit', function(res, $) {
            res.should.have.status(200);
            $('form')
                .fill({ "Book[name]": 'FOOBAR'})
                .submit(function(res, $){
                    res.should.have.status(200);
                    res.should.have.header('Content-Length');
                    res.should.have.header('Content-Type', 'text/html; charset=utf-8');

                    $('title').should.have.text('Books:Book show');
                    $('h1').should.have.text('Details of book');

                    $('table.table.table-bordered td').should.have.text('FOOBAR');

                    $('.alert.alert-success').should.have.text('Book updated');


                    // change back the name of the book
                    browser.get('/books/1/edit', function(res, $) {
                        $('form').fill({ "Book[name]": 'Game of Thrones'}).submit(function() {
                            done()
                        });
                    });
                });
        });
    });
});

