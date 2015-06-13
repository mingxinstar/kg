/**
 * 当日考勤单个考勤view
 *
 * @author mingxin.huang
 * @update 2015.06.10
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        kd = require('models/kd'),
        checkinModel = require('models/checkin'),
        todayTmpl = require('text!templates/checkin/todayList.html');


    var checkinTodayView = backbone.View.extend({
        tagName : 'li',
        model : checkinModel,
        events : {
            'tap .fa-trash-o' : 'del'
        },
        initialize : function () {

        },
        render : function () {
            var data = this.model.toJSON();
            data.reasonTip = core.getCheckinReason(data.reason);

            this.$el.html(template(todayTmpl, {data : data}));

            return this;
        },
        del : function () {
            this.model.del();

            this.remove();
        }
    });

    return checkinTodayView;
});