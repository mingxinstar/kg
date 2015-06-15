require.config({
    paths : {
        'backbone'              : 'libs/backbone/backbone',
        'backbone.localStorage' : 'libs/backbone/localStorage',
        'zepto'                 : 'libs/zepto/zepto',
        'template'              : 'libs/zepto/template',
        'lazyload'              : 'libs/zepto/lazyload',
        'touch'                 : 'libs/zepto/touch',
        'underscore'            : 'libs/underscore',
        'text'                  : 'libs/text',
        'weixin'                : 'libs/weixin'
    },
    shim : {
        'backbone' : {
            exports : 'backbone'
        },
        'backbone.localStorage' : {
            exports : 'backbone.localStorage'
        },
        'zepto' : {
            exports : '$',
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

require(['backbone', 'models/kd', 'routers/workspace-T'], function (backbone, kd, workspace) {
    var appRouters = new workspace();

    backbone.history.start();
})