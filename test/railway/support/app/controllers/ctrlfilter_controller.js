load('application');

// assigning filterfunction to local scoped variables
// and load filters with use()
var testfilterParameterLogging  = filterParameterLogging,
    testskipBeforeFilter        = skipBeforeFilter,
    testskipAfterFilter         = skipAfterFilter,
    testbefore                  = before,
    testbeforeFilter            = beforeFilter,
    testprependBefore           = prependBefore,
    testprependBeforeFilter     = prependBeforeFilter,
    testafter                   = after,
    testafterFilter             = afterFilter,
    testprependAfter            = prependAfter,
    testprependAfterFilter      = prependAfterFilter,
    testFilterBeforeCallOnce                = use('testFilter1'),
    testFilterBeforeCallMultiple            = use('testFilter2'),
    testFilterBeforeCallOnOnly              = use('testFilter3'),
    testFilterBeforeCallOnExcept            = use('testFilter4'),
    testFilterBeforeCallOnceNamed           = use('testFilter5'),
    testFilterBeforeCallMultipleNamed       = use('testFilter6'),
    testFilterBeforeSkipBefore_Skipped      = use('testFilter7'),
    testFilterBeforePrependBefore1          = use('testFilter8'),
    testFilterBeforePrependBeforeNamed      = use('testFilter9'),
    prependBeforeCalledBeforeNormalBefore   = false,

    testFilterAfterCallOnce                 = use('testFilter21'),
    testFilterAfterCallMultiple             = use('testFilter22'),
    testFilterAfterCallOnOnly               = use('testFilter23'),
    testFilterAfterCallOnExcept             = use('testFilter24'),
    testFilterAfterCallOnceNamed            = use('testFilter25'),
    testFilterAfterCallMultipleNamed        = use('testFilter26'),
    testFilterAfterSkipAfter_Skipped        = use('testFilter27'),
    testFilterAfterPrependAfter1            = use('testFilter28'),
    testFilterAfterPrependAfterNamed        = use('testFilter29'),
    prependAfterCalledAfterNormalAfter      = false;

before(testFilterBeforeCallOnce.fn);   // will be used to test if filter is only called once
before('testFilterCallNamed_thename', testFilterBeforeCallOnceNamed.fn); // named called once test
before(testFilterBeforeCallMultiple.fn);   // will be used to test if filter can be called multiple times if multiple before is used
before(testFilterBeforeCallMultiple.fn);
before('testFilterBeforeCallMultipleNamed_thename', testFilterBeforeCallMultipleNamed.fn);
before(testFilterBeforeCallMultipleNamed.fn);
before(testFilterBeforeCallOnOnly.fn, {only: 'filters'});
before(testFilterBeforeCallOnExcept.fn, {except: 'filters'});

before('testFilterBeforeSkipBefore_Skipped_thename', testFilterBeforeSkipBefore_Skipped.fn, {only: 'filters'});
skipBeforeFilter('testFilterBeforeSkipBefore_Skipped_thename');

prependBefore(testFilterBeforePrependBefore1.fn);
prependBeforeFilter(testFilterBeforePrependBeforeNamed.fn);
prependBefore(function(next) {
    prependBeforeCalledBeforeNormalBefore = testFilterBeforeCallOnce.called === 0 ? true : false;
    next();
});



after(testFilterAfterCallOnce.fn);   // will be used to test if filter is only called once
after('testFilterAfterCallNamed_thename', testFilterAfterCallOnceNamed.fn); // named called once test
after(testFilterAfterCallMultiple.fn);   // will be used to test if filter can be called multiple times if multiple after is used
after(testFilterAfterCallMultiple.fn);
after('testFilterAfterCallMultipleNamed_thename', testFilterAfterCallMultipleNamed.fn);
after(testFilterAfterCallMultipleNamed.fn);
after(testFilterAfterCallOnOnly.fn, {only: 'filters'});
after(testFilterAfterCallOnExcept.fn, {except: 'filters'});

after('testFilterAfterSkipAfter_Skipped_thename', testFilterAfterSkipAfter_Skipped.fn, {only: 'filters'});
skipAfterFilter('testFilterAfterSkipAfter_Skipped_thename');

prependAfter(testFilterAfterPrependAfter1.fn);
prependAfterFilter(testFilterAfterPrependAfterNamed.fn);
prependAfter(function(next) {
    prependAfterCalledAfterNormalAfter = testFilterAfterCallOnce.called === 0 ? true : false;
    next();
});
    

action('filters', function() {
    send({
        exist_filterParamLogging    : typeof testfilterParameterLogging === 'function',
        exist_skipBeforeFilter      : typeof testskipBeforeFilter === 'function',
        exist_skipAfterFilter       : typeof testskipAfterFilter === 'function',
        exist_before                : typeof testbefore === 'function',
        exist_beforeFilter          : typeof testbeforeFilter === 'function',
        exist_prependBefore         : typeof testprependBefore === 'function',
        exist_prependBeforeFilter   : typeof testprependBeforeFilter === 'function',
        exist_after                 : typeof testafter === 'function',
        exist_afterFilter           : typeof testafterFilter === 'function',
        exist_prependAfter          : typeof testprependAfter === 'function',
        exist_prependAfterFilter    : typeof testprependAfterFilter === 'function',

        before_called_once          : testFilterBeforeCallOnce.called,
        before_called_multiple      : testFilterBeforeCallMultiple.called,
        before_named_called_once    : testFilterBeforeCallOnceNamed.called,
        before_named_called_multiple: testFilterBeforeCallMultipleNamed.called,
        before_called_ononly        : testFilterBeforeCallOnOnly.called,
        before_called_onexcept      : testFilterBeforeCallOnExcept.called,
        skipBeforeFilter_named      : testFilterBeforeSkipBefore_Skipped.called,
        prependBeforeCalled         : testFilterBeforePrependBefore1.called,
        prependBeforeCalledNamed    : testFilterBeforePrependBeforeNamed.called,
        prependBeforeCalledBeforeNormalBefore : prependBeforeCalledBeforeNormalBefore,


        after_called_once           : testFilterAfterCallOnce.called,
        after_called_multiple       : testFilterAfterCallMultiple.called,
        after_named_called_once     : testFilterAfterCallOnceNamed.called,
        after_named_called_multiple : testFilterAfterCallMultipleNamed.called,
        after_called_ononly         : testFilterAfterCallOnOnly.called,
        after_called_onexcept       : testFilterAfterCallOnExcept.called,
        skipAfterFilter_named       : testFilterAfterSkipAfter_Skipped.called,
        prependAfterCalled          : testFilterAfterPrependAfter1.called,
        prependAfterCalledNamed     : testFilterAfterPrependAfterNamed.called,
        prependAfterCalledAfterNormalAfter : prependAfterCalledAfterNormalAfter
    });
});
