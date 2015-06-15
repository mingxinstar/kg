/**
 * 本月红花榜view
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        flowersList = require('collections/flowersList-T'),
        flowersListView = require('views/flowersList-T');

    var weekList = backbone.View.extend({
        el : '.flowers-panel-month',
        collection : new flowersList('month'),
        initialize : function () {
            this.$list = this.$('ul');

            this.listenTo(this.collection, 'add', this.addOne);

            this.collection.load();
        },
        addOne : function (model) {
            var view = new flowersListView({model : model});

            this.$list.append(view.render().$el);
        }
    });

    return new weekList();
});