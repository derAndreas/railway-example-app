
require('./test_helper');


describe('Route Tests', function(){
    function findRouteByPathInArray(path, data) {
        var i = 0, l = data.length;

        for(; i < l; i++) {
            if(data[i].path === path) { return data[i]; }
        }
    }

    describe('with map.resource(#name#) in routes.js config', function() {
        describe('generates routes for CRUD', function() {
            describe('validate the routes in app.routes', function() {
                var allRoutes, getRoutes, postRoutes, putRoutes, deleteRoutes;

                function testGenericRoutes(method, route, done) {
                    route.should.be.a('object');
                    route.should.have.property('method', method);
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('controller');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('action');
                    param2.optional.should.eql(false);
                    done()
                }

                before(function(done) {
                    allRoutes    = app.routes.routes;
                    getRoutes    = allRoutes.get;
                    postRoutes   = allRoutes.post;
                    putRoutes    = allRoutes.put;
                    deleteRoutes = allRoutes['delete'];

                    done();
                });

                it('should have GET /posts route', function(done) {
                    var route = findRouteByPathInArray('/posts.:format?', getRoutes);
                    
                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);
                    done();
                });

                it('should have GET /posts/new route', function(done) {
                    var route = findRouteByPathInArray('/posts/new.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts\/new(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);
                    done();
                });


                it('should have GET /posts/:id/edit route', function(done) {
                    var route = findRouteByPathInArray('/posts/:id/edit.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts\/(?:([^\/]+?))\/edit(?:\.([^\/\.]+?))?\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have GET /posts/:id route', function(done) {
                    var route = findRouteByPathInArray('/posts/:id.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have POST /posts route', function(done) {
                    var route = findRouteByPathInArray('/posts.:format?', postRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'post');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);
                    
                    done();
                });

                it('should have DELETE /post/:id route', function(done) {
                    var route = findRouteByPathInArray('/posts/:id.:format?', deleteRoutes);
                    
                    route.should.be.a('object');
                    route.should.have.property('method', 'delete');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have PUT /post/:id route', function(done) {
                    var route = findRouteByPathInArray('/posts/:id.:format?', putRoutes);
                    
                    route.should.be.a('object');
                    route.should.have.property('method', 'put');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/posts\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have generic GET routes', function(done) {
                    var route = findRouteByPathInArray('/:controller/:action', getRoutes);
                    testGenericRoutes('get', route, done);
                });

                it('should have generic POST routes', function(done) {
                    var route = findRouteByPathInArray('/:controller/:action', postRoutes);
                    testGenericRoutes('post', route, done);
                });

                it('should have generic DELETE routes', function(done) {
                    var route = findRouteByPathInArray('/:controller/:action', deleteRoutes);
                    testGenericRoutes('delete', route, done);
                });

                it('should have generic PUT routes', function(done) {
                    var route = findRouteByPathInArray('/:controller/:action', putRoutes);
                    testGenericRoutes('put', route, done);
                });
            });

            describe('GET /posts', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/posts', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/index.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('index');
                    done()
                });
            });

            describe('POST /posts', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().postt('/posts', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/create.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('create');
                    done()
                });
            });

            describe('GET /posts/new', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/posts/new', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/new.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('new');
                    done()
                });
            });

            describe('GET /posts/:id/edit', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/posts/:id/edit', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/new.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('edit');
                    done()
                });
            });

            describe('DELETE /posts/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().deletee('/posts/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/destroy.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('destroy');
                    done()
                });
            });

            describe('PUT /posts/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().putt('/posts/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/update.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('update');
                    done()
                });
            });

            describe('GET /posts/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/posts/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/show.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('show');
                    done()
                });
            });
        });
    });

    describe('with map.resource(#name#, {path: "#alternate#") in routes.js config', function() {
        // for testing in config/routes.js the #alternate# is configured as "postings"
        describe('generates routes for CRUD', function() {
            describe('validate the routes in app.routes', function() {
                var allRoutes, getRoutes, postRoutes, putRoutes, deleteRoutes;

                function findRouteByPathInArray(path, data) {
                    var i = 0,
                        l = data.length;

                    for(; i < l; i++) {
                        if(data[i].path === path) {
                            return data[i];
                        }
                    }

                    return false;
                }

                function testGenericRoutes(method, route, done) {
                    route.should.be.a('object');
                    route.should.have.property('method', method);
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('controller');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('action');
                    param2.optional.should.eql(false);
                    done()
                }

                before(function(done) {
                    allRoutes    = app.routes.routes;
                    getRoutes    = allRoutes.get;
                    postRoutes   = allRoutes.post;
                    putRoutes    = allRoutes.put;
                    deleteRoutes = allRoutes['delete'];

                    done();
                });

                it('should have GET /postings route', function(done) {
                    var route = findRouteByPathInArray('/postings.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);
                    done();
                });

                it('should have GET /postings/new route', function(done) {
                    var route = findRouteByPathInArray('/postings/new.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings\/new(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);
                    done();
                });


                it('should have GET /postings/:id/edit route', function(done) {
                    var route = findRouteByPathInArray('/postings/:id/edit.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings\/(?:([^\/]+?))\/edit(?:\.([^\/\.]+?))?\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have GET /postings/:id route', function(done) {
                    var route = findRouteByPathInArray('/postings/:id.:format?', getRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'get');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i )
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have POST /postings route', function(done) {
                    var route = findRouteByPathInArray('/postings.:format?', postRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'post');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(1);

                    var params = route.keys[0];
                    params.should.have.keys(['name', 'optional']);
                    params.name.should.eql('format');
                    params.optional.should.eql(true);

                    done();
                });

                it('should have DELETE /postings/:id route', function(done) {
                    var route = findRouteByPathInArray('/postings/:id.:format?', deleteRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'delete');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });

                it('should have PUT /postings/:id route', function(done) {
                    var route = findRouteByPathInArray('/postings/:id.:format?', putRoutes);

                    route.should.be.a('object');
                    route.should.have.property('method', 'put');
                    route.should.have.property('regexp')
                    route.regexp.should.eql(/^\/postings\/(?:([^\/]+?))(?:\.([^\/\.]+?))?\/?$/i)
                    route.should.have.property('callbacks');
                    route.callbacks.should.be.a('object');
                    route.should.have.property('keys')
                    route.keys.should.be.a('object').and.lengthOf(2);

                    var param1 = route.keys[0];
                    param1.should.have.keys(['name', 'optional']);
                    param1.name.should.eql('id');
                    param1.optional.should.eql(false);

                    var param2 = route.keys[1];
                    param2.should.have.keys(['name', 'optional']);
                    param2.name.should.eql('format');
                    param2.optional.should.eql(true);
                    done();
                });
            });


            describe('GET /postings', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/postings', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/index.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('index');
                    done()
                });
            });

            describe('POST /postings', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().postt('/postings', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/create.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('create');
                    done()
                });
            });

            describe('GET /postings/new', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/postings/new', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/new.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('new');
                    done()
                });
            });

            describe('GET /postings/:id/edit', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/postings/:id/edit', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/new.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('edit');
                    done()
                });
            });

            describe('DELETE /postings/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().deletee('/postings/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/destroy.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('destroy');
                    done()
                });
            });

            describe('PUT /postings/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().putt('/postings/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/update.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('update');
                    done()
                });
            });

            describe('GET /postings/:id', function() {
                var response, $;
                before(function(done) {
                    getTestBrowser().gett('/postings/:id', function(res_, $_){
                        response = res_;
                        $ = $_;

                        response.should.have.status(200);
                        response.should.have.header('Content-Length');
                        response.should.have.header('Content-Type', 'text/html; charset=utf-8');

                        done();
                    });
                });

                it('should return the html from posts/show.jade', function(done) {
                    $('head').should.have.lengthOf(1);
                    $('body').should.have.lengthOf(1);
                    $('.test').should.have.text('show');
                    done()
                });
            });
        });
    });

    describe('route path_to helper', function() {
        var response, $;
        before(function(done) {
            getTestBrowser().gett('pathtohelper', function(res_, $_){
                response = res_;
                $ = $_;

                response.should.have.status(200);
                response.should.have.header('Content-Length');
                response.should.have.header('Content-Type', 'application/json; charset=utf-8');

                done();
            });
        });


        it('should generate correct paths for map.resources()', function(done) {
            response.body.should.have.property('path_posts_noparams', '/posts');
            response.body.should.have.property('path_newpost_noparams', '/posts/new');
            response.body.should.have.property('path_editpost_noparams', '');
            response.body.should.have.property('path_post_noparams', '');
            response.body.should.have.property('path_posts_params', '/posts');
            response.body.should.have.property('path_newpost_params', '/posts/new');
            response.body.should.have.property('path_editpost_params', '/posts/123/edit');
            response.body.should.have.property('path_editpost_params_obj', '/posts/123-id/edit');
            response.body.should.have.property('path_post_params_obj', '/posts/321-id');
            response.body.should.have.property('path_posts_params_format', '/posts.json');
            response.body.should.have.property('path_newpost_params_format', '/posts/new.json');
            response.body.should.have.property('path_editpost_params_format', '/posts/123/edit.json');
            response.body.should.have.property('path_post_params_format', '/posts/321.json');
            done()
        });

        it('should generate correct paths for map.resources("post", {as: "articles"})', function(done) {
            response.body.should.have.property('path_articles_noparams', '/posts');
            response.body.should.have.property('path_newarticle_noparams', '/posts/new');
            response.body.should.have.property('path_editarticle_noparams', '');
            response.body.should.have.property('path_article_noparams', '');
            response.body.should.have.property('path_articles_params', '/posts');
            response.body.should.have.property('path_newarticle_params', '/posts/new');
            response.body.should.have.property('path_editarticle_params', '/posts/123/edit');
            response.body.should.have.property('path_editarticle_params_obj', '/posts/123-id/edit');
            response.body.should.have.property('path_article_params_obj', '/posts/321-id');
            response.body.should.have.property('path_articles_params_format', '/posts.json');
            response.body.should.have.property('path_newarticle_params_format', '/posts/new.json');
            response.body.should.have.property('path_editarticle_params_format', '/posts/123/edit.json');
            response.body.should.have.property('path_article_params_format', '/posts/321.json');
            done()
        });
/*
        posts GET    /posts.:format?             posts#index
        posts POST   /posts.:format?             posts#create
     new_post GET    /posts/new.:format?         posts#new
    edit_post GET    /posts/:id/edit.:format?    posts#edit
         post DELETE /posts/:id.:format?         posts#destroy
         post PUT    /posts/:id.:format?         posts#update
         post GET    /posts/:id.:format?         posts#show
        posts GET    /postings.:format?          posts#index
        posts POST   /postings.:format?          posts#create
     new_post GET    /postings/new.:format?      posts#new
    edit_post GET    /postings/:id/edit.:format? posts#edit
         post DELETE /postings/:id.:format?      posts#destroy
         post PUT    /postings/:id.:format?      posts#update
         post GET    /postings/:id.:format?      posts#show
     articles GET    /posts.:format?             posts#index
     articles POST   /posts.:format?             posts#create
  new_article GET    /posts/new.:format?         posts#new
 edit_article GET    /posts/:id/edit.:format?    posts#edit
      article DELETE /posts/:id.:format?         posts#destroy
      article PUT    /posts/:id.:format?         posts#update
      article GET    /posts/:id.:format?         posts#show
 pathtohelper GET    /pathtohelper               posts#pathtohelper
              ALL    /:controller/:action        undefined#undefined
              ALL    /:controller/:action/:id    undefined#undefined
 */

    });
});