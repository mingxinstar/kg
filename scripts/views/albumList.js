/**
 * 相册页面模块，负责相册相关的展示
 *
 * @author mingxin.huang
 * @update 2015.05.30
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),

        albumList = require('collections/albumList');

    var albumListView = backbone.View.extend({
        el : '.app-view-album',
        collection : albumList,
        initialize : function () {
            this.listenTo(this.collection, 'reset', this.render);

            this.collection.fetch({reset : true});

            this.$el.addClass('show-app-view');
            this.$('.app-view-content').html('ul');
        },
        render : function () {
            
        }
    });

    return albumListView;
});