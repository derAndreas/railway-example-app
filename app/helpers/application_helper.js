
module.exports = {
    UserIsAuthenticated : UserIsAuthenticated
};

/**
 * Check if an authenticated is is available
 * Uses the `User` model.
 * 
 * @param {Object} user User object from Session
 * @return {Boolean}
 */
function UserIsAuthenticated(user) {
    return User.isAuthenticated(user);
}