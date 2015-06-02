define(function (require) {
    var backbone = require('backbone');

    var WorkSpace = backbone.Router.extend({
        routes : {
            ''         : 'index', //默认首页
            'album'    : 'album',  //相册
            'reminder' : 'reminder', //事件提醒
            'checkin'  : 'checkin', //学生考勤
            'flowers'  : 'flowers', //红花榜
            'msg'      : 'msg', //班级消息
            'contacts' : 'contacts', //通讯录
            'register' : 'register', //注册审核
            'feedback' : 'feedback', //产品反馈
            'log'      : 'log' //操作记录
        },
        index : function () {
            console.log('index');
            require(['views/index'], function (indexView) {
                indexView.render();
            });
        },
        album : function () {
            console.log('album');

            require(['views/albumList'], function (albumListView) {
                // var abListView = new albumListView();
                albumListView.show();
            });
        },
        reminder : function () {
            console.log('reminder');
        },
        checkin : function () {
            console.log('checkin');
        },
        flowers : function () {
            console.log('flowers');
        },
        msg : function () {
            console.log('msg');
        },
        contacts : function () {
            console.log('contacts');
        },
        register : function () {
            console.log('register');
        },
        feedback : function () {
            console.log('feedback');
        },
        log : function () {
            console.log('log');
        }
    });

    return WorkSpace;
});