

load('application');
before(use('isAuthenticatedHook'));

action('index', function() {
    this.title = 'Your Profile'
    render();
});
