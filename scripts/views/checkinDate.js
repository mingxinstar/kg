/**
 * 请假日期选择页面
 *
 * @author mingxin.huang
 * @update 2015.06.24
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),
        datepicker = require('ui/datepicker');

    var baseTmpl = '\
        <div class="app-view-content">\
            <div id="checkin-leave-datepicker-area"></div>\
        </div>\
        <nav class="app-view-nav-bar">\
            <a href="javascript:;" class="btn-handle-cancel">取消</a>\
            <a href="javascript:;" class="btn-handle-confirm">确定</a>\
        </nav>\
    ';

    var dateView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-checkin-date',
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'confirm',
            'tap td' : 'addDate'
        },
        initialize : function (model, view) {
            this.model = model;
            this.leaveView = view;
            this.currMonth = core.formatTime(null, 'yyyy-MM');

            this.dpView = new datepicker({
                month : this.currMonth,
                isSelect : true,
                callback : this.changeMonth,
                context : this
            });
        },
        changeMonth : function (month) {
            this.currMonth = month;

            var monthData = this.model.get(month) || [];

            for (var i = monthData.length - 1; i >= 0; i--) {
                this.dpView.mark(monthData[i], 'blue');
            };
        },
        render : function () {
            this.$el.html(baseTmpl);

            this.$('#checkin-leave-datepicker-area').html(this.dpView.render().$el);

            $('.app-view-checkin').append(this.$el);

            return this;
        },
        close : function () {
            core.debug('date remove');

            this.remove();
        },
        /**
         * 处理确定按钮
         * @return {[type]} [description]
         */
        confirm : function () {
            this.leaveView.addDate(this.model.toJSON());

            this.close();
        },
        addDate : function (e) {
            var $this = $(e.currentTarget),
                day = $this.data('day');

            core.debug('day : ', day);

            if (this.dpView.isMarked(day)) {
                this.dpView.clear(day);
                this.model.remove(this.currMonth, day);
            } else {
                this.dpView.mark(day, 'blue');
                this.model.add(this.currMonth, day);
            }
        }
    });

    return dateView;
});