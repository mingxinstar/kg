/**
 * 消息列表view
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        msgList = require('collections/msgList'),
        msgItem = require('views/msgItem');

    var msgListView = backbone.View.extend({
        el : '.app-view-msg',
        collection : msgList,
        events : {
            'touchend .app-view-nav-bar .btn' : 'showHandler',
            'touchend .msg-list-right' : 'showDetail'
        },
        initialize : function () {
            this.$content = this.$('.app-view-content');
            this.$content.html('<ul class="common-ul"></ul>');
            this.$list = this.$('ul');

            // 绑定collection
            this.listenTo(this.collection, 'add', this.addOne);

            // 绑定滚动事件
            var that = this;
            this.$content.on('scroll', function (e) {
                that.handleScroll();
            });

            this.collection.load();
        },
        addOne : function (model) {
            var view = new msgItem({model : model}),
                data = model.toJSON();

            if (data.isNew) {
                this.$list.prepend(view.render().$el);
            } else {
                this.$list.append(view.render().$el);
            }
        },
        handleScroll : function (e) {
            var contentH = this.$el.height(),
                listH = this.$list.height(),
                scrollTop = this.$content.scrollTop();

            if (contentH + scrollTop + 500 > listH) {
                core.debug('load more');
                this.collection.load();
            }
        },
        showHandler : function () {
            var that = this;

            require(['views/msgHandler'], function (handlerView) {
                var view = new handlerView();

                that.$el.append(view.$el);
            })
        },
        /**
         * 显示消息消息页
         * @return {[type]} [description]
         */
        showDetail : function (e) {
            var $this = $(e.currentTarget),
                $li = $this.parent(),
                id = $li.data('id'),
                that = this;

            require(['views/msgDetail'], function (detailView) {
                var view = new detailView(id);

                that.$el.append(view.$el);
            });
        }
    });

    return new msgListView();
});