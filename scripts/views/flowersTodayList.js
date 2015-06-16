/**
 * 家长当日红花列表view
 *
 * @author mingxin.huang
 * @update 2045.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        todayList = require('collections/flowersList'),
        todayView = require('views/flowersToday');

    var todayListView = backbone.View.extend({
        el : '.flowers-panel-today',
        collection : todayList,
        initialize : function () {
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'add', this.addOne);

            var that = this;
            this.$el.on('scroll', function () {
                that.handleScroll();
            });

            this.collection.load();
        },
        addOne : function (model) {
            var view = new todayView({model : model});

            this.$list.append(view.render().$el);
        },
        handleScroll : function () {
            var contentH = this.$el.height(),
                listH = this.$list.height(),
                scrollTop = this.$el.scrollTop();

            if (contentH + scrollTop + 500 > listH) {
                core.debug('load more');
                this.collection.load();
            }
        }
    });

    return new todayListView();
});