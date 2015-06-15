/**
 * 教师通讯录审核view
 *
 * @author mingxin.huang
 * @update 2015.06.14
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
        el : '.contacts-panel-teacher',
        collection : new authList('teachers'),
        initialize : function () {
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'reset', this.render)

            this.collection.load();
        },
        render : function () {
            var data = this.getTeachers(),
                that = this;

            _.each(data.auth, function (teacher) {
                var view = new authView(teacher, 'teachers');

                that.$list.append(view.render().$el);
            });

            this.$list.append(template(commonTmpl, {list : data.unauth}));
        },
        /**
         * 获取需要审核和不需要审核的学生列表
         * @return {[type]} [description]
         */
        getTeachers : function () {
            var teachers = kd.getTeachers(),
                authAry = this.collection.toJSON(),
                unauthTeachers = _.reject(teachers, function (teacher) {
                    return !!_.find(authAry, function (authTeacher) {
                        return teacher._id === authTeacher._id;
                    });
                }),
                authTeachers = [];

            _.each(authAry, function (teacher) {
                authTeachers.push(kd.get(teacher._id));
            });

            return {
                auth : authTeachers,
                unauth : unauthTeachers
            };
        }
    });

    return new listView();
});