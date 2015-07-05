/**
 * 考情请假审核列表
 * 
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        vocateList = require('collections/vocateList'),
        vocateView = require('views/checkinVocate-T');

    var vocateListView = backbone.View.extend({
        el : '.checkin-panel-vocate',
        collection : vocateList,
        initialize : function () {
            this.listenTo(this.collection, 'add', this.addOne);

            this.$list = this.$('ul');

            var that = this;
            this.$el.on('scroll', function () {
                that.handleScroll();
            });

            this.collection.load();
        },
        refresh : function () {
            this.collection.load();
        },
        addOne : function (model) {
            var view = new vocateView({model : model});

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

    return new vocateListView();
});