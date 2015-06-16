define(function (require) {
    var backbone = require('backbone'),

        kd = require('models/kd');

    var WorkSpace = backbone.Router.extend({
        routes : {
            ''          : 'index', //默认首页
            'album'     : 'album',  //相册
            'babyalbum' : 'babyalbum',  //宝贝相册
            'reminder'  : 'reminder', //事件提醒
            'checkin'   : 'checkin', //学生考勤
            'flowers'   : 'flowers', //红花榜
            'msg'       : 'msg', //班级消息
            'contacts'  : 'contacts', //通讯录
            'register'  : 'register', //注册审核
            'feedback'  : 'feedback', //产品反馈
            'log'       : 'log', //操作记录
            'user/:user_id' : 'user' //用户个人信息中心
        },
        index : function () {
            require(['views/index'], function (indexView) {
                indexView.render();
            });
        },
        album : function () {
            require(['views/albumList'], function (albumListView) {
                changeView('album')
            });
        },
        babyalbum : function () {
            require(['views/babyAlbumList'], function (albumListView) {
                changeView('babyalbum')
            });
        },
        reminder : function () {
            require(['views/reminderList'], function (reminderListView) {
                changeView('reminder');
            });
        },
        checkin : function () {
            require(['views/checkin'], function () {
                changeView('checkin');
            });
        },
        flowers : function () {
            require(['views/flowers'], function () {
                changeView('flowers');
            });
        },
        msg : function () {
            require(['views/msgList'], function () {
                changeView('msg');
            });
        },
        contacts : function () {
            require(['views/contacts'], function () {
                changeView('contacts');
            });
        },
        feedback : function () {
            require(['views/feedback'], function () {
                changeView('feedback');
            });
        },
        log : function () {
        },
        user : function (user_id) {
            if (kd.isSelf(user_id) || kd.isParent(user_id)) {
                require(['views/userSelf'], function (userView) {
                    var view = new userView(user_id);

                    view.render();
                });   
            } else {
                require(['views/user'], function (userView) {
                    var view = new userView(user_id);

                    view.render();
                });
            }
        }
    });
    
    /**
     * 切换到对应的view
     * @param  {String} viewName view的名称
     */
    function changeView (viewName) {
        $('#app-wrap .app-view-'+viewName).addClass('show-app-view');
    }
    
    return WorkSpace;
});