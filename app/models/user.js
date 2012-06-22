var crypto = require('crypto'),
    AbstractClass = User.super_;

//User.hasMany(Role, {as: 'roles', foreignKey: 'roleId'});
User.hasAndBelongsToMany(Role, {as: 'roles', through: UserRoles});


User.authenticateUserByUsernameAndPassword = function(username, password, callback) {
    User.findOne({where: {username: username}}, function(err, result) {
        if(err) {
            callback(['An unknown error occured']);
        } else if(!result) {
            callback(['Login not successfull, please validate your credentials']);
        } else {
            var saltPass = result.salt + password,
                md5Pass  = crypto.createHash('sha256').update(saltPass).digest('hex');

            User.findOne({where: {username : username, password: md5Pass}}, function(err, user) {
                if(err) {
                    callback(['An unknown error occured']);
                } else if(!user) {
                    callback(['Login not successfull, please validate your credentials']);
                } else {
                    callback(null, user);
                }
            });
        }
    })
};

/**
 * Get the authentication status of a user.
 *
 * @param {AbstractClass} user  the User model instance
 * @param {Function}      cb    a callback function, if omitted method directly returns value
 * @return {Boolean}
 */
User.isAuthenticated = function(user, cb) {
    if(cb) {
        cb(user.__isAuthenticated || false);
    } else {
        return user.__isAuthenticated || false;
    }
};

/**
 * Set the authentication status of a user.
 *
 * It does not seem to place this method in the prototype of User,
 * if we create a user with `new User(data)` the method is not available.
 * Only with persisted Users by .create() will receive this method.
 * So use this flexible solution: If the passed in model is not an
 * instanceof AbstractClass and has no ID we use the passed user model instance.
 *
 * @param {AbstractClass} user      the User model instance
 * @param {Boolean}       setter    the value to set, if the first param is the user
 * @param {Function}      cb        a callback function, if omitted method directly returns value
 * @return {AbstractClass}
 */
User.setAuthenticated = function(user, setter, cb) {
    var isUserModelInstance = user instanceof AbstractClass;

    if(!isUserModelInstance) {
        throw new Error('Need to pass in a jugglingdb model instance');
    }

    user.__isAuthenticated = setter;

    if(cb) {
        cb(user);
    } else {
        return user;
    }
}