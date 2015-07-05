/**
 * 家长请假view
 *
 * @author mingxin.huang
 * @update 2016.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),
        swal = require('swal'),

        core = require('base/core'),
        leaveTmpl = require('text!templates/checkin/leave.html'),
        dateModel = require('models/checkinDate');

    var leaveView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-checkin-leave',
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'submit',
            'tap .fa-minus-square' : 'delDate',
            'tap .btn-add-time' : 'showDatepicker'
        },
        initialize : function () {
            this.$el.html(leaveTmpl);

            this.model = new dateModel();

            this.$dateList = this.$('ul');
        },
        render : function () {
            return this;
        },
        close : function () {
            core.debug('leave remove');

            this.remove();
        },
        submit : function () {
            var data = this.$('form').serializeArray(),
                sendData = {
                    date : this.model.getFormatDate(),
                    title : data[0].value,
                    reason : data[1].value
                };

            if (!sendData.title) {
                swal({
                    title : '请填写原因',
                    type : 'warning'
                });
                return;
            }

            if (!sendData.reason) {
                swal({
                    title : '请选择请假类型',
                    type : 'warning'
                });
                return;
            }

            if (sendData.date.length === 0) {
                swal({
                    title : '请填写请假时间',
                    type : 'warning'
                });
                return
            }

            this.addLeave(sendData);
            this.close();
        },
        addLeave : function (data) {
            core.getResult({
                url : 'parent/leave_apply',
                type : 'POST',
                data : data
            });

            swal({
                title : '申请已发送，请等待老师审核',
                type : 'success'
            });
        },
        delDate : function (e) {
            var $this = $(e.currentTarget),
                $span = $this.siblings('span'),
                $li = $this.parent(),
                $lis = this.$dateList.find('li'),
                date = $span.text();

            this.model.remove(date.substr(0,7), date.substr(8));
            $li.remove();
        },
        /**
         * 添加请假日期
         * @param {[type]} data [description]
         */
        addDate : function (data) {
            core.debug('addDate : ', data);

            var listTmpl = '\
                <% for (var key in data) {  var days = data[key]; %>\
                    <% for (var i = 0, l = days.length; i < l; i++) { %>\
                        <li class="clearfix">\
                            <span><%=key+"-"+days[i]%></span>\
                            <i class="fa fa-minus-square fa-2x"></i>\
                        </li>\
                    <% } %>\
                <% } %>\
            ';

            this.$dateList.html(template(listTmpl, {data : data}));
        },
        showDatepicker : function () {
            var that = this;

            require(['views/checkinDate'], function (dateView) {
                var view = new dateView(that.model, that);

                view.render();
            });
        }
    });

    return leaveView;
});