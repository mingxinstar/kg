/**
 * 相册页面模块，负责相册相关的展示
 *
 * @author mingxin.huang
 * @update 2015.05.30
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),

        core = require('base/core'),
        kd = require('models/kd'),
        albumView = require('views/album'),
        albumList = require('collections/albumList');

    var albumListView = backbone.View.extend({
        el : '.app-view-album',
        collection : albumList,
        initialize : function () {
            core.loadCss('album');

            this.$content = this.$('.app-view-content');

            this.$content.html('<ul></ul>');
            this.$el.addClass('show-app-view');
            
            this.listenTo(this.collection, 'reset', this.render);

            this.$content.on('scroll', this.handleScroll);

            this.collection.fetch({reset : true});
        },
        render : function () {
            core.debug(this.collection.toJSON());

            this.collection.each(function (model) {
                var view = new albumView({model : model});

                this.$content.find('ul').append(view.render().$el);
            }, this);
        },
        handleScroll : function (e) {
            core.debug('scroll : ', e, $(this).height(), $(this).scrollTop());
        }
    });

    return albumListView;
});