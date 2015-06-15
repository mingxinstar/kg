/**
 * 当日红花列表view
 *
 * @author mingxin.huang
 * @update 2045.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        todayList = require('collections/flowersTodayList-T'),
        todayView = require('views/flowersToday-T');

    var todayListView = backbone.View.extend({
        el : '.flowers-panel-today',
        collection : todayList,
        initialize : function () {
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'add', this.addOne);

            this.collection.load();
        },
        addOne : function (model) {
            var view = new todayView({model : model});

            this.$list.append(view.render().$el);
        }
    });

    return new todayListView();
});