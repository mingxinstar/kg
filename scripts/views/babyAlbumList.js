/**
 * 宝贝相册view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        lazyload = require('lazyload'),

        core = require('base/core'),
        kd = require('models/kd'),
        albumList = require('collections/babyAlbumList'),
        albumView = require('views/babyAlbum'),
        baseTmpl = '\
            <% var core = require("base/core"); %>\
            <a href="#user/<%=data.child._id%>" class="ava ava-sm"><img src="<%=core.getAvatar(data.child._id)%>" alt="" /></a>\
            <ul></ul>\
        ';

    var albumListView = backbone.View.extend({
        el : '.app-view-babyalbum',
        collection : albumList,
        initialize : function () {
            core.loadCss('babyAlbum');

            this.$content = this.$('.app-view-content');
            this.$content.html(template(baseTmpl, {data : kd.getCurrData()}));
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