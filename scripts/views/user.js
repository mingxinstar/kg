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

        core = require('base/core'),
        kd = require('models/kd'),
        userTmpl = require('text!templates/user/info.html');

    var userView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-user',
        events : {
            'tap .app-view-nav-bar a' : 'close'
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
        }
    });

    return userView;
});