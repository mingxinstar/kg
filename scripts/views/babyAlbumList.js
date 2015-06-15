/**
 * 宝贝相册view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        albumList = require('collections/babyalbumList');

    var albumListView = backbone.View.extend({
        el : '.app-view-babyview',
        initialize : function () {
            core.loadCss('babyalbum');

            this.$content = this.$('.app-view-content');
            this.$content.html('<ul class="common-ul"></ul>');
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'add', this.addOne);

            // 绑定滚动事件
            var that = this;
            this.$content.on('scroll', function (e) {
                that.handleScroll();
            });

            this.collection.load();
        },
        addOne : function (model) {
            var view = new albumView({model : model});

            this.$list.append(view.render().$el);

            this.$content.find('.album-lazy').lazyload({
                container : this.$content
            });
        },
        handleScroll : function (e) {
            var contentH = this.$el.height(),
                listH = this.$('ul').height(),
                scrollTop = this.$content.scrollTop();

            if (contentH + scrollTop + 500 > listH) {
                core.debug('load more');
                this.collection.load();
            }
        }
    });

    return new albumListView();
});