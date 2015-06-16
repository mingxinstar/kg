/**
 * 家长事件提醒列表
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),
        reminderList = require('collections/reminderList'),
        reminderView = require('views/reminder');

    var reminderListView = backbone.View.extend({
        el : '.app-view-reminder',
        collection : reminderList,
        events : {
            'tap .app-view-nav-bar .btn' : 'showHandler'
        },
        initialize : function () {
            // 加载对应的css文件
            core.loadCss('reminder');

            this.$content = this.$('.app-view-content');

            this.$content.empty();
            this.$content.html('<ul class="common-ul"></ul>');
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'add', this.addOne);
        },
        addOne : function (model) {
            var view = new reminderView({model : model});

            if (model.toJSON().isNew) {
                this.$list.prepend(view.render().$el);
            } else {
                this.$list.append(view.render().$el);
            }
        },
        showHandler : function () {
            var that = this;

            require(['views/reminderHandler'], function (handlerView) {
                var view = new handlerView();

                that.$el.append(view.render().$el);
            });
        }
    });

    return new reminderListView();
});