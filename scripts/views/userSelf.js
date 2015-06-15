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
            'tap .app-view-nav-bar a' : 'close'
        },
        initialize : function (user_id) {
            core.loadCss('user');

            this.userId = user_id;
            this.user = kd.get(user_id);
            this.user._id = user_id;
        },
        render : function () {
            this.$el.append(template(selfTmpl, {data : this.user}));

            $('#app-wrap').append(this.$el);

            return this;
        },
        close : function () {
            window.history.back();

            this.remove();
        }
    });

    return userView;
});