/**
 * 单个请假view
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        vocateModel = require('models/vocate'),
        vocateTmpl = require('text!templates/checkin/vocate.html');

    var vocateView = backbone.View.extend({
        tagName : 'li',
        model : vocateModel,
        events : {
            'tap .btn' : 'pass'
        },
        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
        },
        /**
         * 获取请假的理由
         * @param  {Number} reason 类型
         * @return {String}        [description]
         */
        getCheckinReason : function (type) {
            var reason = '';

            switch (type) {
                case 0 :
                    reason = '缺勤';
                    break;
                case 1 : 
                    reason = '病假';
                    break;
                case 2 :
                    reason = '事假';
                    break;
                case 3 :
                    reason = '其他';
                    break;
            }

            return reason;
        },
        render : function () {
            var data = this.model.toJSON();
            data.reasonTip = this.getCheckinReason(data.reason);

            this.$el.html(template(vocateTmpl, {data : data}));

            if (data.audit) {
                this.$el.addClass('vocate-passed');
            }

            return this;
        },
        pass : function () {
            this.model.agree();
        }
    });

    return vocateView;
});