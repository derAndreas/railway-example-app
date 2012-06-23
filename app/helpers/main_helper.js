var undef;

module.exports = {
    renderErrorMessages: renderErrorMessages
};

/**
 * Render Error Messages for HTML output
 *
 * @param {Object} errors the errors as an key value pair
 * @return {String}
 */
function renderErrorMessages(errors) {
    var out = '';

    if(!errors || Object.keys(errors).length == 0) {
        return out;
    }

    out += genericTag('div', printErrors(), {'class': 'alert alert-error'});

    return out;

    function printErrors() {
        var out = '<p>';
        out += genericTag('strong', 'Validation failed. Fix following errors before you continue:');
        out += '</p>';
        for (var prop in errors) {
            if (errors.hasOwnProperty(prop)) {
                out += '<ul>';
                errors[prop].forEach(function (msg) {
                    out += genericTag('li',  msg, {'class': 'error-message'});
                });
                out += '</ul>';
            }
        }
        return out;
    }

}


// ----------------------------------------------- private helpers -----------------
// The following helpers are copied here, because a direct require() is not
// possible and a require() into the node_moduels/railway/lib folder cannot
// be the solution. Define the utils in an own helper file

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


function htmlTagParams(params, override) {
    var maybe_params = '';
    safe_merge(params, override);
    for (var key in params) {
        if (params[key] != undef) {
            maybe_params += ' ' + key + '="' + params[key].toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"';
        }
    }
    return maybe_params;
};

function safe_merge(merge_what) {
    merge_what = merge_what || {};
    Array.prototype.slice.call(arguments).forEach(function (merge_with, i) {
        if (i == 0) return;
        for (var key in merge_with) {
            if (!merge_with.hasOwnProperty(key) || key in merge_what) continue;
            merge_what[key] = merge_with[key];
        }
    });
    return merge_what;
};