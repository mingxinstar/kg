/**
 * 宝贝考勤view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        kd = require('models/kd'),
        datepicker = require('ui/datepicker'),
        detailList = require('collections/detailList'),

        detailTmpl = '\
            <div id="detail-picker-container"></div>\
            <div class="detai-tip-area fa-sz-2x clearfix">\
                <span class="color-blue">缺勤</span>\
                <span class="color-red">病假</span>\
                <span class="color-green">事假</span>\
                <span class="color-orange">其他</span>\
            </div>\
            <div class="detail-info-area fa-sz-2x"></div>\
        ',
        infoTmpl = '\
            <% var core = require("base/core"), kd = require("models/kd"), teacher = kd.get(data.teacher_id); %>\
            <% if (data.reason === 0) { %>\
                <p><span>类型</span>:<%=core.getCheckinReason(data.reason)%></p>\
                <p><span>处理人</span>:<%=teacher.name%></p>\
            <% } else { var child = kd.get(data.child_id), parent = kd.get(data.parent_id); %>\
                <p><span>类型</span>:<%=core.getCheckinReason(data.reason)%></p>\
                <p><span>请假人</span>:<%=child.name+kd.getCall(parent.relation)%></p>\
                <p><span>原因</span>:<%=data.title%></p>\
                <p><span>处理人</span>:<%=teacher.name%></p>\
            <% } %>\
        ';

    var checkinView = backbone.View.extend({
        el : '.app-view-checkin',
        collection : detailList,
        events : {
            'tap #detail-picker-container .date-selected' : 'showInfo',
            'tap .app-view-nav-bar .btn' : 'showHandler'
        },
        initialize : function () {
            core.loadCss('checkin');

            // 初始化基础数据
            var user = kd.getCurrData(),
                child = user.child,
                month = core.formatTime(null, 'yyyy-MM');

            this.$('.app-view-content').html(detailTmpl);
            this.$infoArea = this.$('.detail-info-area');

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
            this.$('#detail-picker-container').html(this.dpView.render().$el);

            // 初始化集合
            this.collection = new detailList(child._id, month);
            this.listenTo(this.collection, 'reset', this.renderDatePicker)
            this.collection.load();
        },
        renderDatePicker : function () {
            var list = this.collection.toJSON();

            for (var i = 0, l = list.length; i < l; i++) {
                var data = list[i],
                    date = new Date(data.date),
                    color = 'blue';

                switch (data.reason) {
                    case 1 :
                        color = 'red';
                        break;
                    case 2 :
                        color = 'green';
                        break
                    case 3 :
                        color = 'orange';
                        break;
                }

                this.dpView.mark(date.getDate(), color);
            }
        },
        /**
         * 显示当天的请假信息
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        showInfo : function (e) {
            var $this = $(e.currentTarget),
                day = $this.data('day'),
                data = this.collection.getAbsenceData(day);

            this.$infoArea.html(template(infoTmpl, {data : data}));
        },
        /**
         * 改变月份
         * @param  {[type]} month [description]
         * @return {[type]}       [description]
         */
        changeMonth : function (month) {
            this.collection.load(month);
        },
        showHandler : function () {
            var that = this;

            require(['views/checkinLeave'], function (leaveView) {
                var view = new leaveView();
                
                that.$el.append(view.$el);
            });
        }
    });

    return new checkinView();
});