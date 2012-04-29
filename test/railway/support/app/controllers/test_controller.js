
function testShouldBeDefined(obj, message) {
    if(obj === null) {
        return message || false;
    }

    return true;
}

load('application');

action('index', function () {
    render();
});

action('validateglobals', function() {

    send({
        req         : typeof req === 'object' && req.url === '/test/validateglobals',
        request     : typeof request === 'object' && request.url === '/test/validateglobals',
        req_request : req === request,
        res         : typeof res === 'object' && testShouldBeDefined(res.socket) && testShouldBeDefined(res.connection),
        response    : typeof response === 'object' && testShouldBeDefined(response.socket) && testShouldBeDefined(response.connection),
        res_response: res === response,
        session     : testShouldBeDefined(session),
        reqs_session: req.session === session && request.session === session,
        params      : testShouldBeDefined(params),
        reqp_params : req.params === params && request.params === params,
        body        : testShouldBeDefined(body),
        reqb_body   : req.body === body && request.body === body,

        actionName  : testShouldBeDefined(actionName) && actionName === 'validateglobals',
        path_to     : testShouldBeDefined(path_to) && (typeof path_to === 'object'),
        app         : testShouldBeDefined(app) && Array.isArray(app.stack),
        railway     : testShouldBeDefined(railway) && (typeof railway.utils === 'object')
    });
});

action('use-and-publish-from-app-controller', function() {
    var funcFromAppCtrl = use('testPublishFunctionFromAppCtrl'),
        funcFromAppCtrlWithArgs = use('testPublishFunctionFromAppCtrlWithArgs');

    send({
        use_available               : typeof use === 'function',
        publish_available           : typeof publish === 'function',
        import_function_and_use     : typeof funcFromAppCtrl === 'function',
        use_func_called             : funcFromAppCtrl(),
        import_functionArgs_and_use : typeof funcFromAppCtrlWithArgs === 'function',
        use_funcArgs_called         : funcFromAppCtrlWithArgs(1, 2),
    });
});