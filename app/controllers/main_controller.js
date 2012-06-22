
load('application');

action('index', function() {
    this.title = 'Welcome to RailwayJS demo project'
    render();
});

action('login', function() {
    this.title = 'Login to RailwayJS demo project';
    this.errors = {};
    
    if(request.method.toLowerCase() == 'post') {
        var formValidation = validateUserFormInput(request.body.username, request.body.password);
        if(!formValidation.success) {
            this.errors = formValidation.errors;
            render();
        } else {
            User.authenticateUserByUsernameAndPassword(request.body.username, request.body.password, function(err, user) {
                if(err) {
                    this.errors.invalid = err;
                    render();
                } else {
                    flash('success', 'Welcome ' + user.name + '! You have successfully logged in.');
                    
                    User.setAuthenticated(user, true);
                    request.session.user = user;
                    redirect(path_to.root);
                }
            }.bind(this));
        }
    } else {
        render();
    }
});

action('logout', function() {
    session.user = use('generateAnonymouseUser');
    redirect(path_to.root);
});


function validateUserFormInput(username, password) {
    var result = {
        success : true,
        errors : {}
    };

    if(!username || username == '') {
        result.errors['username'] = ['Please provide a username'];
        result.success = false;
    }

    if(!password || password == '') {
        result.errors['password'] = ['Please provide a password'];
        result.success = false;
    }

    return result;
}