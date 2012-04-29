var express    = require('express'),
    MySQLStore = require(app.root + '/vendor/connect-session-store-mysql')(express),
    config     = require('./database.json');

app.configure(function(){
    var cwd = process.cwd();
    
    app.use(express.static(cwd + '/public', {maxAge: 86400000}));
    app.set('views', cwd + '/app/views');
    app.set('view engine', 'ejs');
    app.set('view options', {complexNames: true});
    app.set('jsDirectory', '/javascripts/');
    app.set('cssDirectory', '/stylesheets/');
    app.use(express.bodyParser());
    app.use(express.cookieParser('secret'));


    app.use(express.session({
        secret: 'secret',
        store : new MySQLStore(config[app.set('env')], {
            expire: 3600
        })
    }));
    app.use(express.methodOverride());
    app.use(app.router);
});
