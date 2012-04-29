var undef,
    RwUtils = require('node_modules/railway/lib/railway_utils'),        // todo: BAD!
    htmlTagParams = RwUtils.html_tag_params,
    safe_merge = RwUtils.safe_merge;

module.exports = {
    renderErrorMessages: renderErrorMessages,
    UserIsAuthenticated: UserIsAuthenticated
};

function renderErrorMessages(errors) {
    var out = '';

    if(!errors || Object.keys(errors).length == 0) {
        return out;
    }

    out += genericTag('div', printErrors(), {class: 'alert alert-error'});

    return out;

    function printErrors() {
        var out = '<p>';
        out += genericTag('strong', 'Validation failed. Fix following errors before you continue:');
        out += '</p>';
        for (var prop in errors) {
            if (errors.hasOwnProperty(prop)) {
                out += '<ul>';
                errors[prop].forEach(function (msg) {
                    out += genericTag('li',  msg, {class: 'error-message'});
                });
                out += '</ul>';
            }
        }
        return out;
    }

}

function UserIsAuthenticated(user) {
    return User.isAuthenticated(user);
}



















// ----------------------------------------------- private helpers -----------------

// copied from helpers.js
/**
 * Returns html code of one tag with contents
 *
 * @param String name - name of tag
 * @param String inner - inner html
 * @param Object params - set of tag attributes
 * @param Object override - set params to override params in previous arg
 */
function genericTag(name, inner, params, override) {
    return '<' + name + htmlTagParams(params, override) + '>' + inner + '</' + name + '>';
}

function genericTagSelfclosing(name, params, override) {
    return '<' + name + htmlTagParams(params, override) + ' />';
}