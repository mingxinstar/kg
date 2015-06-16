/**
 * 家长单个提醒视图
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        kd = require('models/kd'),
        model = require('models/reminder'),
        template = require('template'),
        listTmpl = require('text!templates/reminder/list-T.html');

    var reminderView = backbone.View.extend({
        tagName : 'li',
        events : {
            'tap .fa-trash' : 'del'
        },
        initialize : function () {
            // 数据变更时进行修改视图
            this.listenTo(this.model, 'change', this.render);

            this.listenTo(this.model, 'destroy', this.remove);
        },
        render : function () {
            var data = this.model.toJSON();

            this.$el.html(template(listTmpl, {data : data}));

            if (data.audit >= 1) {
                this.$el.addClass('reminder-readed');
            }

            return this;
        },
        del : function () {
            this.model.del();
        }
    });

    return reminderView;
});