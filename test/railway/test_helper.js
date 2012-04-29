process.env.NODE_ENV = 'test';
process.chdir('test/railway/support');


var tobi    = require('tobi'),
    Browser = tobi.Browser,
    host = '127.0.0.1',
    port = 3001,
    app  = require('../../node_modules/railway/lib/onrailway').createServer().listen(port);

global.getTestBrowser = function getTestBrowser(options) {
    var browser = tobi.createBrowser(port, host, options);

    return browser;
}

Browser.prototype.gett = function() {
    return this.get.apply(this, buildQuery(arguments));
};

Browser.prototype.postt = function() {
    return this.post.apply(this, buildQuery(arguments));
}

Browser.prototype.deletee = function() {
    return this['delete'].apply(this, buildQuery(arguments));
}

Browser.prototype.putt = function() {
    return this.put.apply(this, buildQuery(arguments));
}

function buildQuery(args) {
    args = Array.prototype.slice.call(args);
    args[0]  = 'http://' + host + ':' + port + (args[0].charAt(0) === '/' ? '' : '/') + args[0];

    return args;
}