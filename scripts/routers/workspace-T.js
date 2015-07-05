define(function (require) {
    var backbone = require('backbone'),

        kd = require('models/kd');
        // swal = require('swal');

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
            'log'      : 'log', //操作记录
            'user/:user_id' : 'user' //用户个人信息中心
        },
        index : function () {
            require(['views/index'], function (indexView) {
                indexView.render();
            });
        },
        album : function () {
            changeView('album')
            
            require(['views/albumList'], function (albumListView) {
            });
        },
        reminder : function () {
            changeView('reminder');
            
            require(['views/reminderList-T'], function (reminderListView) {
            });
        },
        checkin : function () {
            changeView('checkin');
            
            require(['views/checkin-T'], function () {
            });
        },
        flowers : function () {
            changeView('flowers');
            
            require(['views/flowers-T'], function () {
            });
        },
        msg : function () {
            changeView('msg');
            
            require(['views/msgList'], function () {
            });
        },
        contacts : function () {
            changeView('contacts');
            
            require(['views/contacts-T'], function () {
            });
        },
        feedback : function () {
            changeView('feedback');
            
            require(['views/feedback'], function () {
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
        // swal.close();
        $('#app-wrap .app-view-'+viewName).addClass('show-app-view');
    }
    
    return WorkSpace;
});