/**
 * 用户个人中心页面view
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),
        swal = require('swal'),

        core = require('base/core'),
        kd = require('models/kd'),
        userTmpl = require('text!templates/user/info.html');

    var userView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-user',
        events : {
            'tap .app-view-nav-bar a' : 'close',
            'tap .leave-msg-area' : 'showChat'
        },
        initialize : function (user_id) {
            core.loadCss('user');

            this.userId = user_id;
            this.user = kd.get(user_id);
        },
        render : function () {
            this.$el.append(template(userTmpl, {data : this.user}));

            $('#app-wrap').append(this.$el);

            return this;
        },
        close : function () {
            window.history.back();

            this.remove();
        },
        showChat : function () {
            var that = this;

            swal({
                title : '请输入您想说的话',
                text : '<textarea id="msg-detail-textarea" class="common-input" cols="30" rows="10"></textarea>',
                html : true,
                showCancelButton : true,
                cancelButtonText : '取消',
                confirmButtonText : '确定',
                closeOnConfirm : false
            }, function (isConfirm) {
                var text = $('#msg-detail-textarea').val().trim();

                if (text.length === 0) {
                    return;
                }

                that.sendMsg(text);

                swal.close();
            });
        },
        /**
         * 发送消息
         * @param  {String} msg [description]
         * @return {[type]}     [description]
         */
        sendMsg : function (msg) {
            core.getResult({
                url : 'mail_box/send',
                type : 'POST',
                data : {
                    to : [this.userId],
                    msg : msg
                },
                success : function () {
                    swal('发送成功');
                }
            });
        }
    });

    return userView;
});
