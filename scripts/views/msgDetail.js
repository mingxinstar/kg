/**
 * 消息页面详细信息view
 *
 * @author mingxin.hunag
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),
        swal = require('swal'),

        core = require('base/core'),
        wx = require('base/wx'),
        detailModel = require('models/msgDetail'),
        detailTmpl = require('text!templates/msg/detail.html');

    var detailView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-msg-detail',
        events : {
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-vote' : 'vote',
            'tap img' : 'preview',
            'tap .detail-chat-new' : 'showChat'
        },
        initialize : function (msgId) {
            this.model = new detailModel(msgId);

            this.listenTo(this.model, 'change', this.render);

            this.model.load();

            wx.init();
        },
        render : function () {
            var data = this.model.toJSON();

            if (!data.teacher_id) {
                return this;
            }

            this.$el.html(template(detailTmpl, {data : data, model : this.model}));

            return this;
        },
        close : function () {
            this.remove();
        },
        vote : function (e) {
            var $input = this.$('input:checked'),
                value = $input.val();
            
            this.model.vote(value);
        },
        preview : function (e) {
            var $this = $(e.currentTarget),
                currentImg = $this.attr('src');

            wx.previewImage(currentImg, this.model.get('pics'));
        },
        /**
         * 显示聊天输入框
         */
        showChat : function () {
            var that = this;

            swal({
                title : '请输入您想说的话',
                text : '<textarea id="msg-detail-textarea" class="common-input" cols="30" rows="10"></textarea>',
                html : true,
                showCancelButton : true,
                cancelButtonText : '取消',
                confirmButtonText : '确定',
                closeOnConfirm : false
            }, function (isConfirm) {
                var text = $('#msg-detail-textarea').val().trim();

                if (text.length === 0) {
                    return;
                }

                that.model.chat(text);

                swal.close();
            });
        }
    });

    return detailView;
});