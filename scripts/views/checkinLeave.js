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

        core = require('base/core'),
        leaveTmpl = require('text!templates/checkin/leave.html');

    var leaveView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-checkin-leave',
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'submit',
            'tap .fa-minus-square' : 'delDate',
            'tap .btn-add-time' : 'addDate',
        },
        initialize : function () {
            this.$el.html(leaveTmpl);

            this.$dateList = this.$('ul');
        },
        render : function () {

            return this;
        },
        close : function () {
            this.remove();
        },
        submit : function () {
            var data = this.$('form').serializeArray(),
                sendData = {
                    date : [],
                    title : '',
                    reason : ''
                };

            core.debug('data : ', data);

            sendData.title = data[0].value;
            sendData.reason = data[1].value;

            for (var i = 2; i < data.length; i++) {
                var value = data[i].value;

                if (value && sendData.date.indexOf(value) < 0) {
                    sendData.date.push(value);
                }
            }

            core.debug('sendData : ', sendData);

            if (!sendData.title) {
                alert('请填写原因');
                return;
            }

            if (!sendData.reason) {
                alert('请选择请假类型');
                return;
            }

            if (sendData.date.length === 0) {
                alert('请填写请假时间');
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
        },
        delDate : function (e) {
            var $this = $(e.currentTarget),
                $li = $this.parent(),
                $lis = this.$dateList.find('li');

            if ($lis.length <= 1) {
                return;
            }

            $li.remove();
        },
        addDate : function () {
            this.$dateList.append('\
                <li class="clearfix">\
                    <input class="common-input" type="date" name="date">\
                    <i class="fa fa-minus-square fa-2x"></i>\
                </li>\
            ');
        }
    });

    return leaveView;
});