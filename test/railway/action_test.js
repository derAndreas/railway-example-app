
require('./test_helper');

describe('in Actions', function() {

    describe('Railway Global', function() {
        var response, $;

        before(function(done) {
            getTestBrowser().gett('test/validateglobals', function(r, j) {
                response = r;
                $ = j;

                response.body.should.exist;
                response.body.should.be.a('object');
                response.should.have.status(200);
                response.should.have.header('Content-Length');
                response.header('Content-Type').should.match(/application\/json/);

                done()
            });
        });

        it('`request` and `req` should be available', function(done) {
            response.body.should.have.property('req', true);
            response.body.should.have.property('request', true);
            response.body.should.have.property('req_request', true);

            done()
        });

        it('`response` and `res` should be available', function(done) {
            response.body.should.have.property('res', true);
            response.body.should.have.property('response', true);
            response.body.should.have.property('res_response', true);

            done()
        });

        it('`session` should be available', function(done) {
            response.body.should.have.property('session', true);
            response.body.should.have.property('reqs_session', true);

            done()
        });

        it('`params` should be available', function(done) {
            response.body.should.have.property('params', true);
            response.body.should.have.property('reqp_params', true);

            done()
        });

        it('`body` should be available', function(done) {
            response.body.should.have.property('body', true);
            response.body.should.have.property('reqb_body', true);

            done()
        });

        it('`actionName` should be available', function(done) {
            response.body.should.have.property('actionName', true);

            done()
        });

        it('`path_to` should be available', function(done) {
            response.body.should.have.property('path_to', true);

            done()
        });

        it('`app` should be available', function(done) {
            response.body.should.have.property('app', true);

            done()
        });

        it('`railway` should be available', function(done) {
            response.body.should.have.property('railway', true);

            done()
        });
    });
});