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
        touch = require('touch'),

        core = require('base/core'),
        dateTmpl = require('text!templates/ui/datepicker.html');

    var datepicker = backbone.View.extend({
        tagName : 'div',
        className : 'datepicker-area',
        events : {
            'tap .datepicker-nav' : 'changeMonth'
        },
        options : {
            title : '',
            titlePrefix : '',
            month : core.formatTime(null, 'yyyy-MM'), //时间格式为2015-06
            selectedDays : [], //选中的日期 [1,11,22]
            isSelect : false, //是否可以选择月份
            callback : null //改变月份的回调函数
        },
        initialize : function (options) {
            core.loadCss('ui/datepicker');

            _.extend(this.options, options || {});

            // core.debug('options : ', this.options);

            // this.render();
        },
        organizeData : function () {
            var monthAry = this.options.month.split('-'),
                year = parseInt(monthAry[0], 10),
                month = parseInt(monthAry[1], 10),
                dayCount = new Date(year, month, 0).getDate(),
                firstDay = new Date(year, month-1, 1).getDay();

            this.options.currentMonthCount = year*12+month;
            this.options.dayCount = dayCount;
            this.options.firstDay = firstDay;
        },
        render : function () {
            this.organizeData();

            core.debug("options : ", this.options);

            this.$el.html(template(dateTmpl, {data : this.options}));

            return this;
        },
        changeMonth : function (e) {
            var $select = $(e.currentTarget),
                action = $select.data('action');

            if (action === 'next') {
                this.options.currentMonthCount++;
            } else {
                this.options.currentMonthCount--;
            }

            var year = Math.floor(this.options.currentMonthCount/12),
                month = this.options.currentMonthCount % 12;

            month = month < 10 ? '0'+month : month;

            this.options.month = year + '-' + month;

            this.render();

            // 执行回调
            if (typeof this.options.callback === 'function') {
                this.options.callback(this.options.month);
            }
        },
        /**
         * 标记特定的某天
         * @param  {[type]} day   [description]
         * @param  {[type]} color [description]
         * @return {[type]}       [description]
         */
        mark : function (day, color) {
            this.$('.td-day-'+day).addClass('date-selected date-selected-'+color);
        },
        check : function (day) {
            this.$('.td-day-'+day).append('<i class="fa fa-check color-red"></i>');
        }
    });

    return datepicker;
});