/**
 * 考勤报表详细信息view
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        datepicker = require('ui/datepicker'),
        detailList = require('collections/detailList'),

        detailTmpl = '\
            <div class="app-view-content">\
                <div id="detail-picker-container"></div>\
                <div class="detai-tip-area fa-sz-20 clearfix">\
                    <span class="color-blue">缺勤</span>\
                    <span class="color-red">病假</span>\
                    <span class="color-green">事假</span>\
                    <span class="color-orange">其他</span>\
                </div>\
                <div class="detail-info-area fa-sz-24"></div>\
            </div>\
            <nav class="app-view-nav-bar">\
                <a href="javascript:;" class="btn-handle-cancel">关闭</a>\
            </nav>\
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

    var detaiView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-detail',
        collection : detailList,
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .date-selected' : 'showInfo'
        },
        initialize : function (childId, month) {
            this.$el.html(detailTmpl);

            this.$infoArea = this.$('.detail-info-area');

            this.dpView = new datepicker();

            this.$('#detail-picker-container').html(this.dpView.render().$el);

            this.collection = new detailList(childId, month);

            this.listenTo(this.collection, 'reset', this.renderDatePicker)

            this.collection.load();
        },
        renderDatePicker : function () {
            core.debug('renderDatePicker : ', this.collection.toJSON());

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
        close : function () {
            this.remove();
        },
        showInfo : function (e) {
            var $this = $(e.currentTarget),
                day = $this.data('day'),
                data = this.collection.getAbsenceData(day);

            this.$infoArea.html(template(infoTmpl, {data : data}));
        }
    });

    return detaiView;
});