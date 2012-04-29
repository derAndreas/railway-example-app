
User.seed(function() {
    return {
        name    : 'First User',
        username: 'username@demo.com',
        email   : 'username@demo.com',
        password: '',
        salt    : 'need-to-be-done',
        enabled : 0,
        registeredAt : new Date(),
        deletedAt : 0,
        lastChangePw: 0,
        lastLoginSuccess: 0,
        lastLoginFailure: 0,
        roleId: [1, 2],
        groupId: 1
    }
});


User.seed(function() {
    return {
        name    : 'Second User',
        username: 'anotheruser@demo.com',
        email   : 'anotheruser@demo.com',
        password: '',
        salt    : 'need-to-be-done',
        enabled : 0,
        registeredAt : new Date(),
        deletedAt : 0,
        lastChangePw: 0,
        lastLoginSuccess: 0,
        lastLoginFailure: 0,
        roleId: 2,
        groupId: 2
    }
});