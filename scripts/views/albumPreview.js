/**
 * 相册页面预览模块
 *
 * @author mingxin.huang
 * @update 2015.05.05
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        previewTmpl = require('text!templates/album/preview.html');

    var albumPreviewView = backbone.View.extend({
        className : 'album-preview-area',
        events : {
            'tap img'                 : 'close',
            'tap .fa-arrow-up'        : 'toggleDel',
            'tap .btn-del-pic'        : 'delPic',
            'tap .btn-collect'        : 'collect',
            'tap .btn-cancel-collect' : 'cancelCollect',
            'swipeLeft'               : 'next',
            'swipeRight'              : 'prev'
        },
        initialize : function (attrs, options) {
            core.loadCss('preview');

            this.type = attrs.type || 'parent';
            this.currIndex = this.model.indexOf(attrs.currPic);

            this.listenTo(this.model, 'delPic', this.rmPic);
        },
        render : function () {
            var data = this.model.toJSON();
            data.currIndex = this.currIndex;
            data.type = this.type;

            this.$el.html(template(previewTmpl, {data : data}));
            this.$pagin = this.$('.album-preview-pagin');
            this.$list = this.$('ul');

            this.changePos();

            return this;
        },
        /**
         * 关闭预览
         */
        close : function () {
            this.remove();
        },
        next : function () {
            var index = this.currIndex + 1;

            if (index >= this.model.get('pics').length) {
                return;
            }

            this.currIndex = index;

            this.changePos();

            this.setPagin();
        },
        prev : function () {
            var index = this.currIndex - 1;

            if (index < 0) {
                return;
            }

            this.currIndex = index;

            this.changePos();

            this.setPagin();
        },
        changePos : function () {
            this.$list.css('transform', 'translateX('+(-720*this.currIndex)+'px)');
            this.$list.css('-ms-transform', 'translateX('+(-720*this.currIndex)+'px)');
            this.$list.css('-webkit-transform', 'translateX('+(-720*this.currIndex)+'px)');
        },
        /**
         * 设置页码
         */
        setPagin : function () {
            this.$pagin.text((this.currIndex+1) + ' / '+this.model.get('pics').length);
        },
        toggleDel : function () {
            this.$('.fa-arrow-up').toggleClass('fa-rotate-180');
            this.$('.album-pic-handle-area').toggleClass('show-handle-area');
        },
        /**
         * 删除图片
         */
        delPic : function () {
            var pics = this.model.get('pics'),
                picKey = pics[this.currIndex];

            this.model.delPic(picKey);
        },
        /**
         * 从视图中删除图片
         * @return {[type]} [description]
         */
        rmPic : function (pic_key) {
            var length = this.model.get('pics').length;

            if (this.model.get('pics').length === 0) {
                return this.close();
            }
            
            this.$('li[data-key='+pic_key+']').remove();

            if (this.currIndex >= length) {
                this.currIndex = length -1 ;
                this.changePos();
            }

            this.toggleDel();
            this.setPagin();
        },
        /**
         * 切换图片收藏
         * @param  {[type]} e [description]
         */
        collect : function (e) {
            var $this = $(e.currentTarget),
                $i = $this.find('i'),
                pics = this.model.get('pics'),
                picKey = pics[this.currIndex];

            $i.removeClass('fa-star-o').addClass('fa-star');

            this.model.collect(picKey);
        },
        /**
         * 取消收藏
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        cancelCollect : function (e) {
            var pics = this.model.get('pics'),
                picKey = pics[this.currIndex].pkey; 

            this.model.delPic(picKey);
        }
    });

    return albumPreviewView;
});