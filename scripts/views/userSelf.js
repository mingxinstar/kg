/**
 * 个人中心自己模块，增加修改功能
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        kd = require('models/kd'),
        wx = require('base/wx'),
        userModel = require('models/user'),
        selfTmpl = require('text!templates/user/self.html');

    var userView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-user app-view-user-self',
        events : {
            'tap li' : 'handleEdit',
            'tap .app-view-nav-bar a' : 'close',
            'keypress .common-input' : 'handleKeyPress',
            'change .user-sex-radio input' : 'changeSex',
            'tap .user-info-msg' : 'showMsg'
        },
        initialize : function (user_id) {
            core.loadCss('user');

            this.model = new userModel(kd.get(user_id));
            this.model.set({
                id : user_id,
                _id : user_id
            });

            this.listenTo(this.model, 'change', this.render)
        },
        render : function () {
            this.$el.html(template(selfTmpl, {data : this.model.toJSON()}));

            $('#app-wrap').append(this.$el);

            return this;
        },
        close : function () {
            window.history.back();

            this.remove();
        },
        handleEdit : function (e) {
            var $li = $(e.currentTarget),
                $editArea = $li.find('.user-info-edit'),
                $input = $li.find('input'),
                type = $li.data('type');

            if (!type || $editArea.length === 0 || $input.length > 0) {
                return;
            }

            $editArea.hide();
            $li.append('<input type="text" class="common-input" name="'+type+'" />');
            $li.find('input').focus();

        },
        handleKeyPress : function (e) {
            if (e.which !== 13) {
                return;
            }

            var $this = $(e.currentTarget),
                name = $this.attr('name'),
                value = $this.val(),
                fnName = 'change'+name[0].toUpperCase()+name.substr(1);

            if (name === 'phone' && !kd.isTeacher()) {
                var userId = $this.parents('li').data('id');

                this.model[fnName](value, userId);
            } else {
                this.model[fnName](value);
            }
        },
        changeSex : function (e) {
            var $this = $(e.currentTarget),
                value = $this.val();

            this.model.changeSex(value);
        },
        /**
         * 显示留言面板
         * @return {[type]} [description]
         */
        showMsg : function () {
            require(['views/userMsg'], function (msgView) {

            });
        }
    });

    return userView;
});
