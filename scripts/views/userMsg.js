/**
 * 用户个人留言面板
 *
 * @author mingxin.huang
 * @update 2015.07.07
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        msgList = require('collections/userMsgList');

    var baseTmpl = '\
            <div class="app-view-content">\
                <ul></ul>\
            </div>\
            <nav class="app-view-nav-bar">\
                <a href="javascript:;" class="btn-handle-cancel">返回</a>\
            </nav>\
        ',
        liTmpl = '';

    var msgView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-user-msg',
        collection : msgList,
        initialize : function () {
            this.render();

            this.$content = this.$('.app-view-content');

            this.listenTo(this.collection, 'add', this.addOne);

            this.collection.load();
        },
        render : function () {
            this.$el.html(baseTmpl);

            $('.app-view-user-self').append(this.$el);

            return this;
        },
        addOne : function (model) {
            core.debug('addOne : ', model.toJSON());
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

    return new msgView();
});
