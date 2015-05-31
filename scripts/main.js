require.config({
    paths : {
        'backbone'              : 'libs/backbone/backbone',
        'backbone.localStorage' : 'libs/backbone/localStorage',
        'zepto'                 : 'libs/zepto',
        'underscore'            : 'libs/underscore',
        'template'              : 'libs/template',
        'text'                  : 'libs/text'
    },
    shim : {
        'backbone' : {
            exports : 'backbone'
        },
        'backbone.localStorage' : {
            exports : 'backbone.localStorage'
        },
        'zepto' : {
            exports : '$'
        },
        'underscore' : {
            exports : '_'
        },
        'template' : {
            exports : '$.template'
        }
    },
    urlArgs : '_='+new Date().getTime()
});

require(['backbone', 'routers/workspace'], function (backbone, workspace) {
    var appRouters = new workspace();

    backbone.history.start();
})