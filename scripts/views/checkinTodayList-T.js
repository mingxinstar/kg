/**
 * 教师今日考勤模块
 *
 * @author mingxin.huang
 * @update 2015.06.08
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('zepto'),
        template = require('template'),

        core = require('base/core'),
        checkinModel = require('models/checkin'),
        checkinList = require('collections/checkinList-T'),
        checkinTodayView = require('views/checkinToday-T'),
        todayListTmpl = require('text!templates/checkin/todayList.html');

    var todayTmpl = '\
        <div class="date-picker-area clearfix">\
            <input type="date" class="fa-sz-24" value="<%=today%>">\
            <i class="fa fa-chevron-right fa-2x"></i>\
        </div>\
        <ul class="common-ul"></ul>\
    ';

    var todayListView = backbone.View.extend({
        el : '.checkin-panel-today',
        collection : checkinList,
        events : {
            'change input' : 'refresh'
        },
        initialize : function () {
            this.listenTo(this.collection, 'reset', this.reset);

            this.$el.html(template(todayTmpl, {today : core.formatTime(null, 'yyyy-MM-dd')}));

            this.$list = this.$('ul');
            this.$input = this.$('input');
        },
        reset : function () {
            this.$list.html('');

            var list = this.collection.toJSON(),
                that = this;

            _.each(list, function (data) {
                var view = new checkinTodayView({
                    model : new checkinModel(data)
                });

                that.$list.append(view.render().$el);
            });
        },
        /**
         * 刷新列表
         * @return {[type]} [description]
         */
        refresh : function () {
            var date = this.$input.val();

            this.collection.load(date);
        }
    });

    return new todayListView();
});