/**
 * 宝贝红花view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        kd = require('models/kd'),
        datepicker = require('ui/datepicker'),
        monthList = require('collections/flowersMonthList'),
        babyTmpl = '\
            <div id="flowers-datepcker-area"></div>\
            <div class="flowers-count-info fa-sz-2x"></div>\
        ';

    var babyView = backbone.View.extend({
        el : '.flowers-panel-baby',
        collection : monthList,
        initialize : function () {
            this.$el.html(babyTmpl);

            var month = core.formatTime(null, 'yyyy-MM');

            var that = this,
                fn = function (month) {
                    that.changeMonth(month);
                };
            // 初始化日期选择器
            this.dpView = new datepicker({
                month : month,
                isSelect : true,
                callback : fn
            });
            this.$('#flowers-datepcker-area').html(this.dpView.render().$el);

            this.listenTo(this.collection, 'reset', this.renderDatePicker)
            this.collection.load();
        },
        renderDatePicker : function () {
            var list = this.collection.toJSON();

            for (var i = 0, l = list.length; i < l; i++) {
                var date = new Date(list[i].date);

                this.dpView.check(date.getDate());
            }

            this.$('.flowers-count-info').html('本月共获得<b class="color-red">'+list.length+'</b>朵小红花');
        },
        changeMonth : function (month) {
            this.collection.load(month);
        }
    });

    return new babyView();
});