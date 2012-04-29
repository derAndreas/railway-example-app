before('protect from forgery', function () {
    protectFromForgery('5d016d2ae47dfb552e63b831eb9cecd809d60ed8');
});


before(provideAnyUser);
publish(generateAnonymousUser)


/**
 * Require a User before the application is running
 *
 * This does not authenticate or does session checking.
 * It just provides an anonymous user or the user in the
 * session will be used.
 */
function provideAnyUser() {
    var timeout = app.settings && app.settings['session-timeout'],
        user    = req.session.user;

    console.log(user)

    if(!user) {
        // there is no user in the session, so generate an anonymous user
        // The app will use this as a base user but with no rights.
        // the anon user is enabled, but the enduser kann not work with it.
        req.session.user = user = generateAnonymousUser();

        User.setAuthenticated(user, false)
            .lastAccessAt = new Date();

        next();
    } else {
        return next();
        // seems we have a user from the database in the session
        // refresh the session user with the database user
        // and set the authentication flag
        User.findOne(user.id, function(err, dbUser) {
            if(err) {
                // something went wrong, use the anonymous user
                // todo: need to log this for debugging
                dbUser = generateAnonymousUser();
            } else {
                // found the user in the database, lets set the flags
                User.setAuthenticated(dbUser, true);
            }

            // save the user in the session again for the app to work with this user
            request.session.user = dbUser;
            next();
        });
    }
}


function generateAnonymousUser() {
    var anonymous = new User({
            name : 'Anonymous',
            username: false,
            password: false,
            salt: false,
            email: false,
            enabled: true,
            lastAccessAt: new Date()
        });

    anonymous.__isAnonymousUser = true;
        
    return User.setAuthenticated(anonymous, false);
}