var Book = describe('Book', function () {
    property('name', String);
});

var Chapter = describe('Chapter', function () {
    property('title', String);
});

var User = describe('User', function () {
    property('name');
    property('username');
    property('password');
    property('salt');
    property('email');
    property('enabled', Boolean, {default: false});
    property('registeredAt', Date);
    property('deletedAt', Date);
    property('lastAccessAt', Date);
    property('lastChangePw', Date);
    property('lastLoginSuccess', Date);
    property('lastLoginFailure', Date);
});

var Group = describe('Group', function () {
    property('name');
    property('description');
});

var Role = describe('Role', function () {
    property('name');
    property('description');
    property('enabled', Boolean, {default: true});
});


var GroupRoles = describe('GroupRoles');
var UserRoles = describe('UserRoles');