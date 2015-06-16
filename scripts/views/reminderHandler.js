/**
 * 家长创建新提醒view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        reminderModel = require('models/reminder'),
        reminderList = require('collections/reminderList'),
        handlerTmpl = require('text!templates/reminder/handler.html');

    var handlerView = backbone.View.extend({
        tagNmae : 'div',
        className : 'app-view-handler app-view-reminder-add',
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'submit',
            'tap li' : 'toggleSelect'
        },
        initialize : function () {

        },
        render : function () {
            this.$el.html(template(handlerTmpl));

            return this;
        },
        close : function () {
            this.remove();
        },
        submit : function () {
            var $lis = this.$('.selected'),
                teacherIds = [],
                formData = this.$('form').serializeArray();

            for (var i = 0; i < $lis.length; i++) {
                teacherIds.push($($lis[i]).data('id'));
            }

            core.debug(teacherIds, formData);
            if (teacherIds.length === 0) {
                alert("请选择至少一个老师");
                return;
            }

            if (!formData[0].value) {
                alert("请填写提醒时间");
                return;
            }

            if (!formData[1].value) {
                alert("请填写提醒内容");
                return;
            }

            var model = new reminderModel();
            model.create(teacherIds, formData[0].value, formData[1].value);

            reminderList.add(model);

            this.close();
        },
        toggleSelect : function (e) {
            var $this = $(e.currentTarget);

            $this.toggleClass('selected');
        }
    });

    return handlerView;
});