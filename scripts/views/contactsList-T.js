/**
 * 教师同学录列表view
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),
        template = require('template'),

        core = require('base/core'),
        kd = require('models/kd'),
        authList = require('collections/authList'),
        authView = require('views/contactsAuth-T'),
        commonTmpl = require('text!templates/contacts/common.html');

    var listView = backbone.View.extend({
        el : '.contacts-panel-parent',
        collection : new authList(),
        initialize : function () {
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'reset', this.render)

            this.collection.load();
        },
        render : function () {
            var data = this.getChildren(),
                that = this;

            _.each(data.auth, function (child) {
                var view = new authView(child);

                that.$list.append(view.render().$el);
            });

            this.$list.append(template(commonTmpl, {list : data.unauth}));
        },
        /**
         * 获取需要审核和不需要审核的学生列表
         * @return {[type]} [description]
         */
        getChildren : function () {
            var children = kd.getChildren(),
                authAry = this.collection.toJSON(),
                unauthChildren = _.reject(children, function (child) {
                    return !!_.find(authAry, function (unauthChild) {
                        return child._id === unauthChild._id;
                    });
                }),
                authChildren = [];

            _.each(authAry, function (child) {
                authChildren.push(kd.get(child._id));
            });

            return {
                auth : authChildren,
                unauth : unauthChildren
            };
        }
    });

    return new listView();
});