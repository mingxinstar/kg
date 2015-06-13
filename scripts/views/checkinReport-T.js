/**
 * 考勤报表模块
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),
        $ = require('zepto'),

        core = require('base/core'),
        reportList = require('collections/reportList'),
        detailView = require('views/checkinReportDetail-T'),

        reportTmpl = '\
            <div class="report-month-select-area clearfix">\
                <span class="select-arrow" data-action="prev"><i class="fa fa-chevron-left fa-2x"></i></span>\
                <span class="select-month fa-sz-30"><%=month%></span>\
                <span class="select-arrow" data-action="next"><i class="fa fa-chevron-right fa-2x"></i></span>\
            </div>\
            <ul></ul>\
        ',
        reportListTmpl = '\
            <% var kd = require("models/kd"), core = require("base/core"); %>\
            <% for (var i = 0, l = list.length; i < l; i++) { var data = list[i], child= kd.get(data.child_id); %>\
                <li data-id="<%=data.child_id%>">\
                    <div class="ava ava-xs"><img src="<%=core.getAvatar()%>" alt="" /></div>\
                    <span class="fa-sz-24 <%=child.sex === 0 ? "color-pink" : "color-blue"%>"><%=child.name%></span>\
                    <i class="fa fa-chevron-right fa-2x"></i>\
                    <span class="absence-count fa-sz-24">缺勤<b class="color-red"><%=data.count%></b>天</span>\
                </li>\
            <% } %>\
        ';

    var reportView = backbone.View.extend({
        el : '.checkin-panel-report',
        collection : reportList,
        events : {
            'tap .select-arrow' : 'changeMonth',
            'tap li' : 'showDetail'
        },
        initialize : function () {
            var now = new Date(),
                year = now.getFullYear(),
                month = now.getMonth();

            // 记录当前的月数量
            this.currentMonthCount = year*12+month;
            this.currentMonthStr = core.formatTime(null, 'yyyy-MM');

            this.$el.html(template(reportTmpl, {month : this.currentMonthStr}));

            this.$list = this.$('ul');

            this.listenTo(this.collection, 'reset', this.render);

            this.collection.load();
        },
        render : function () {
            this.$list.html(template(reportListTmpl, {list : this.collection.toJSON()}));

            return this;
        },
        changeMonth : function (e) {
            var $select = $(e.currentTarget),
                action = $select.data('action');

            if (action === 'next') {
                this.currentMonthCount++;
            } else {
                this.currentMonthCount--;
            }

            var year = Math.floor(this.currentMonthCount/12),
                month = this.currentMonthCount % 12 + 1;

            month = month < 10 ? '0'+month : month;

            this.currentMonthStr = year + '-' + month;

            this.$('.select-month').text(this.currentMonthStr);

            this.collection.load(this.currentMonthStr);
        },
        /**
         * 显示详细页
         */
        showDetail : function (e) {
            var $li = $(e.currentTarget),
                childId = $li.data('id'),
                currDetailView = new detailView(childId, this.currentMonthStr);

            $('.app-view-checkin').append(currDetailView.render().$el);
        }
    });

    return new reportView();
});