

load('application');
before(use('isAuthenticatedHook'));

action('index', function() {
    this.title = 'Your Profile'
    // Pass in the function to render() as there is a 
    // problem in the parent jade template 'application_layout'
    // to lookup this method, even though it is defined as application_helper
    render({
        UserIsAuthenticated: use('UserIsAuthenticated')
    });
});
