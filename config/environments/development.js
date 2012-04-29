app.configure('development', function () {
    app.set('view engine', 'jade');
    app.disable('view cache');
    app.disable('model cache');
    app.disable('eval cache');
    app.enable('log actions');
    app.enable('env info');
    app.use(require('express').errorHandler({ dumpExceptions: true, showStack: true }));


    app.set('session-timeout', 3600); // Sessiontimeout in seconds, 1 hour
});

