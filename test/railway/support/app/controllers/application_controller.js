before('protect from forgery', function () {
    protectFromForgery('5d016d2ae47dfb552e63b831eb9cecd809d60ed8');
});

publish('testPublishFunctionFromAppCtrl', function() {
    return true;
});

publish('testPublishFunctionFromAppCtrlWithArgs', function(args1, args2) {
    return args1 && args2 ? true : false;
});


// generate some functions for filter testing and publish them
var i = 1,
    len = 50,
    name;
for(; i <  len; i++) {
    name = 'testFilter' + i;
    publish(name, (function() {
        var me = {
            fn: function(next) {
                me.called += 1;
                next();
            },
            called : 0,
            name: name
        };
        return me;
    })());
}