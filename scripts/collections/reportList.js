/**
 * 考勤月度报表集合
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var reportList = backbone.Collection.extend({
        url : 'teachers/class_absence/month_report/{month}',
        sync : core.sync,
        parse : function (res) {
            return res.data;
        },
        initialize : function () {
        },
        /**
         * 加载数据
         * @param  {String} month 表示月度字符串
         * @return {[type]}       [description]
         */
        load : function (month) {
            month = month || core.formatTime(null, 'yyyy-MM');

            this.fetch({
                data : {
                    month : month
                },
                reset : true
            });
        }
    });

    return new reportList();
});