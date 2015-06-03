/**
 * 单条相册的view
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),
        template = require('template'),

        core = require('base/core'),
        albumModel = require('models/album'),
        albumTemplate = require('text!templates/album/list.html');

    var albumView = backbone.View.extend({
        tagName : 'li',
        model : albumModel,
        events : {
            'touchstart img' : 'setRead'
        },
        initialize : function () {
            this.listenTo(this.model, 'change:reader_count', this.addCount);
        },
        render : function () {
            this.$el.html(template(albumTemplate, {data : this.model.toJSON()}));

            return this;
        },
        /**
         * 设置已读
         */
        setRead : function () {
            core.debug('setRead');

            this.model.setRead();
        },
        /**
         * 增加阅读数量
         */
        addCount : function () {
             this.$('.album-tips-area span').text(this.model.get('reader_count'));
        }
    });

    return albumView;
});