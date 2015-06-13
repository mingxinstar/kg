/**
 * 简单版日期显示插件
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),
        _ = require('underscore'),
        template = require('template'),

        core = require('base/core'),
        dateTmpl = require('text!templates/ui/datepicker.html');

    var datepicker = backbone.View.extend({
        tagName : 'div',
        className : 'datepicker-area',
        options : {
            title : '',
            titlePrefix : '',
            month : core.formatTime(null, 'yyyy-MM'), //时间格式为2015-06
            selectedDays : [] //选中的日期 [1,11,22]
        },
        initialize : function (options) {
            core.loadCss('ui/datepicker');

            _.extend(this.options, options || {});

            var monthAry = this.options.month.split('-'),
                year = parseInt(monthAry[0], 10),
                month = parseInt(monthAry[1], 10),
                dayCount = new Date(year, month, 0).getDate(),
                firstDay = new Date(year, month-1, 1).getDay();

            this.options.dayCount = dayCount;
            this.options.firstDay = firstDay;

            core.debug('options : ', this.options);

            this.render();
        },
        render : function () {
            this.$el.html(template(dateTmpl, {data : this.options}));

            return this;
        },
        /**
         * 标记特定的某天
         * @param  {[type]} day   [description]
         * @param  {[type]} color [description]
         * @return {[type]}       [description]
         */
        mark : function (day, color) {
            this.$('.td-day-'+day).addClass('date-selected date-selected-'+color);
        }
    });

    return datepicker;
});