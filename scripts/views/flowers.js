/**
 * 家长红花view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),

        baseTmpl = '\
            <div class="app-view-top-nav">\
                <ul class="clearfix fa-sz-2x">\
                    <li class="active" data-type="today"><span>今日红花</span></li>\
                    <li data-type="baby"><span>宝贝红花</span></li>\
                </ul>\
            </div>\
            <div class="app-content-panel clearfix">\
                <div class="flowers-panel-today"><ul></ul></div>\
                <div class="flowers-panel-baby"></div>\
            </div>\
        ';

    var flowerView = backbone.View.extend({
        el : '.app-view-flowers',
        events : {
            'tap .app-view-top-nav li' : 'changePanel'
        },
        initialize : function () {
            core.loadCss('flowers');

            this.$('.app-view-content').html(baseTmpl);

            this.$panel = this.$('.app-content-panel');

            this.changeView();
        },
        changeView : function (viewName) {
            viewName = viewName || 'today';

            if (viewName === 'today') {
                require(['views/flowersTodayList']);
            } else {
                require(['views/flowersBaby']);
            }
        },
        /**
         * 切换面板
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        changePanel : function (e) {
            var $li = $(e.currentTarget),
                type = $li.data('type');

            $li.addClass('active').siblings().removeClass('active');
            this.$panel.removeClass('show-baby');

            if (type !== 'today') {
                this.$panel.addClass('show-'+type);
            }

            this.changeView(type);
        }
    });

    return new flowerView();
});