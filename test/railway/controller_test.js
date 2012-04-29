

require('./test_helper');


describe('GET simple page', function() {
    var response, $;
    before(function(done) {
        getTestBrowser().gett('test/index', function(res_, $_){
            response = res_;
            $ = $_;

            response.should.have.status(200);
            response.should.have.header('Content-Length');
            response.should.have.header('Content-Type', 'text/html; charset=utf-8');

            done();
        });
    });

    it('should have basic elements', function(done) {
        $('head').should.have.lengthOf(1);
        $('body').should.have.lengthOf(1);
        $('title').should.have.text('Test');
        done()
    });

    it('should have css link tags', function(done) {
        var css1 = $('link[href^="/stylesheets/bootstrap.css"]'),
            css2 = $('link[href^="/stylesheets/style.css"]'),
            css3 = $('link[href^="/stylesheets/bootstrap-responsive.css"]');
            
        css1.should.have.attr('type', 'text/css').and.have.attr('media', 'screen').and.have.attr('rel', 'stylesheet');
        css2.should.have.attr('type', 'text/css').and.have.attr('media', 'screen').and.have.attr('rel', 'stylesheet');
        css3.should.have.attr('type', 'text/css').and.have.attr('media', 'screen').and.have.attr('rel', 'stylesheet');
        done();
    });

    it('should have javascript script tags', function(done) {
        var link1 = $('script[src^="/javascripts/jquery.js"]'),
            link2 = $('script[src^="/javascripts/bootstrap.js"]'),
            link3 = $('script[src^="/javascripts/application.js"]'),
            link4 = $('script[src^="/javascripts/rails.js"]');

       link1.should.have.attr('type', 'text/javascript');
       link2.should.have.attr('type', 'text/javascript');
       link3.should.have.attr('type', 'text/javascript');
       link4.should.have.attr('type', 'text/javascript');
       done()
    });
});

describe('filter', function() {
    var response, $;
    before(function(done) {
        getTestBrowser().gett('ctrlfilter/filters', function(res_, $_){
            response = res_;
            $ = $_;

            response.body.should.exist;
            response.body.should.be.a('object');
            response.should.have.status(200);
            response.should.have.header('Content-Length');
            response.header('Content-Type').should.match(/application\/json/);

            done();
        });
    });

    it('should be available', function(done) {
       response.body.should.have.property('exist_filterParamLogging', true);
       response.body.should.have.property('exist_skipBeforeFilter', true);
       response.body.should.have.property('exist_skipAfterFilter', true);
       response.body.should.have.property('exist_before', true);
       response.body.should.have.property('exist_beforeFilter', true);
       response.body.should.have.property('exist_prependBefore', true);
       response.body.should.have.property('exist_prependBeforeFilter', true);
       response.body.should.have.property('exist_after', true);
       response.body.should.have.property('exist_afterFilter', true);
       response.body.should.have.property('exist_prependAfter', true);
       response.body.should.have.property('exist_prependAfterFilter', true);
       done()
    });

    describe('with before()', function() {
        it('should be called once', function(done) {
            response.body.should.have.property('before_called_once', 1);
            response.body.should.have.property('before_named_called_once', 1);
            done();
        });

        it('can be called multiple times', function(done) {
            response.body.should.have.property('before_called_multiple', 2);
            response.body.should.have.property('before_named_called_multiple', 2);
            done();
        });

        it('is called only for this function', function(done) {
            response.body.should.have.property('before_called_ononly', 1);
            done();
        });

        it('is called except for this function', function(done) {
            response.body.should.have.property('before_called_onexcept', 0);
            done();
        });
    });

    describe('with skipFilterBefore()', function() {
        it('the filter should not be called', function(done) {
            response.body.should.have.property('skipBeforeFilter_named', 0);
            done();
        });
    });

    describe('with prependBefore()', function() {
        it('the filter should not be called', function(done) {
            response.body.should.have.property('prependBeforeCalled', 1);
            response.body.should.have.property('prependBeforeCalledNamed', 1);
            response.body.should.have.property('prependBeforeCalledBeforeNormalBefore', true);

            done();
        });
    });


    describe('!ATTENTION: Does only test if not called before action response send!!!', function() {
        describe('with after()', function() {
            it('should be called once', function(done) {
                response.body.should.have.property('after_called_once', 0);
                response.body.should.have.property('after_named_called_once', 0);
                done();
            });

            it('can be called multiple times', function(done) {
                response.body.should.have.property('after_called_multiple', 0);
                response.body.should.have.property('after_named_called_multiple', 0);
                done();
            });

            it('is called only for this function', function(done) {
                response.body.should.have.property('after_called_ononly', 0);
                done();
            });

            it('is called except for this function', function(done) {
                response.body.should.have.property('after_called_onexcept', 0);
                done();
            });
        });

        describe('with skipFilterAfter()', function() {
            it('the filter should not be called', function(done) {
                response.body.should.have.property('skipAfterFilter_named', 0);
                done();
            });
        });

        describe('with prependAfter()', function() {
            it('the filter should not be called', function(done) {
                response.body.should.have.property('prependAfterCalled', 0);
                response.body.should.have.property('prependAfterCalledNamed', 0);
                response.body.should.have.property('prependAfterCalledAfterNormalAfter', false);
                done();
            });
        });
    });
});

describe('use && publish from app controller', function() {
    var response, $;
    before(function(done) {
        getTestBrowser().gett('test/use-and-publish-from-app-controller', function(res_, $_){
            response = res_;
            $ = $_;

            response.body.should.exist;
            response.body.should.be.a('object');
            response.should.have.status(200);
            response.should.have.header('Content-Length');
            response.header('Content-Type').should.match(/application\/json/);

            done();
        });
    });

    it('should be available', function(done) {
        response.body.should.have.property('use_available', true);
        response.body.should.have.property('publish_available', true);
        done()
    });

    it('should be callable', function(done) {
        response.body.should.have.property('import_function_and_use', true);
        response.body.should.have.property('use_func_called', true);
        
        response.body.should.have.property('import_functionArgs_and_use', true);
        response.body.should.have.property('use_funcArgs_called', true);

        done()
    });
});