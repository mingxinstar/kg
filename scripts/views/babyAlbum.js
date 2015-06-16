/**
 * 宝贝相册单个view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        albumPreview = require('views/albumPreview'),
        albumTmpl = require('text!templates/babyAlbum/album.html');

    var albumView = backbone.View.extend({
        tagName : 'li',
        className : 'clearfix',
        events : {
            'tap img' : 'preview'
        },
        initialize : function () {
            this.listenTo(this.model, 'delPic', this.rmPic);
        },
        render : function () {
            core.debug(this.model.toJSON());

            this.$el.html(template(albumTmpl, {data : this.model.toJSON()}));

            return this;
        },
        preview : function (e) {
            var previewView = new albumPreview({
                currPic : $(e.target).data('key'),
                type : 'baby',
                model : this.model
            });

            $('#app-wrap').append(previewView.render().$el);
        },
        /**
         * 删除图片
         */
        rmPic : function (pic_key) {
            this.$('img[data-key='+pic_key+']').remove();
        }
    });

    return albumView;
});