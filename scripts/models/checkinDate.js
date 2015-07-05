/**
 * 请假模块，日期管理model 
 *
 * @author mingxin.huang
 * @update 2015.06.30
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var dateModel = backbone.Model.extend({
        add : function (month, day) {
            var dates = this.get(month) || [];

            if (dates.indexOf(day) > -1) {
                return;
            }

            dates.push(day);
            dates.sort();

            this.set(month, dates);

            this.trigger('changeDate', this.toJSON());
        },
        remove : function (month, day) {
            var dates = this.get(month) || [];

            dates.splice(dates.indexOf(day), 1);
            dates.sort();

            this.set(month, dates)

            this.trigger('changeDate', this.toJSON());
        },
        /**
         * 获取组织好的数据格式
         * @return {[type]} [description]
         */
        getFormatDate : function () {
            var ary = [],
                data = this.toJSON();

            for (var key in data) {
                var dateAry = data[key];

                for (var i = 0, l = dateAry.length; i < l; i++) {
                    ary.push(key + '-' + dateAry[i]);
                }
            }

            return ary;
        }
    });

    return dateModel;
});