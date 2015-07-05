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
            'tap img' : 'preview'
        },
        initialize : function (msgId) {
            this.model = new detailModel(msgId);

            this.listenTo(this.model, 'change', this.render);

            this.model.load();

            wx.init();
        },
        render : function () {
            var data = this.model.toJSON();

            core.debug('change : ', data);

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
        }
    });

    return detailView;
});