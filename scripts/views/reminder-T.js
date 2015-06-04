/**
 * 教师单个提醒视图
 *
 * @author mingxin.huang
 * @update 2015.06.03
 */

define(function (require) {
    var backbone = require('backbone'),

        kd = require('models/kd'),
        model = require('models/reminder-T'),
        template = require('template'),
        listTmpl = require('text!templates/reminder/list-T.html');

    var reminderView = backbone.View.extend({
        tagName : 'li',
        initialize : function () {

        },
        render : function () {
            this.$el.html(template(listTmpl, {data : this.model.toJSON()}))

            return this;
        }
    });

    return reminderView;
});