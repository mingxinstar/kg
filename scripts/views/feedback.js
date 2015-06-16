/**
 * 意见反馈模块
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),
        baseTmpl = '\
            <form class="fa-sz-24">\
                <textarea name="content" class="common-input" placeholder="请填写您的宝贵意见"></textarea>\
                <input type="text" class="common-input" name="from" placeholder="联系方式" />\
                <p><a href="javascript:;" class="btn btn-success">确定</a></p>\
            </form>\
        ';

    var feedbackView = backbone.View.extend({
        el : '.app-view-feedback',
        events : {
            'tap .btn-success' : 'submit'
        },
        initialize : function () {
            core.loadCss('feedback');

            this.$('.app-view-content').html(baseTmpl);
        },
        submit : function () {
            var data = this.$('form').serializeArray(),
                sendData = {
                    content : data[0].value,
                    from : data[1].value
                };

            if (sendData.content && sendData.from) {
                core.getResult({
                    url : 'user_yjfk',
                    data : sendData,
                    type : 'POST'
                });
            }

            location.hash = '';
        }
    });

    return new feedbackView();
});