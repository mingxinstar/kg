/**
 * 红花模块
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),

        baseTmpl = '\
            <div class="app-view-top-nav">\
                <ul class="clearfix fa-sz-2x">\
                    <li class="active" data-type="today"><span>今日红花</span></li>\
                    <li data-type="week"><span>本周红花</span></li>\
                    <li data-type="month"><span>本月红花</span></li>\
                </ul>\
            </div>\
            <div class="app-content-panel clearfix">\
                <div class="flowers-panel-today"><ul class="common-ul"></ul></div>\
                <div class="flowers-panel-week"><ul class="flowers-list-ul"></ul></div>\
                <div class="flowers-panel-month"><ul class="flowers-list-ul"></ul></div>\
            </div>\
        ';

    var flowerView = backbone.View.extend({
        el : '.app-view-flowers',
        events : {
            'tap .app-view-top-nav li' : 'changePanel',
            'tap .app-view-nav-bar > .btn' : 'showHandler'
        },
        initialize : function () {
            core.loadCss('flowers-T');

            this.$('.app-view-content').html(baseTmpl);

            this.$panel = this.$('.app-content-panel');

            this.changeView();
        },
        changeView : function (viewName) {
            viewName = viewName || 'today';

            if (viewName === 'today') {
                require(['views/flowersTodayList-T']);
            } else if (viewName === 'week') {
                require(['views/flowersWeekList-T']);
            } else {
                require(['views/flowersMonthList-T']);
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
            this.$panel.removeClass('show-week show-month');

            if (type !== 'today') {
                this.$panel.addClass('show-'+type);
            }

            this.changeView(type);
        },
        /**
         * 显示红花添加面板
         */
        showHandler : function () {
            var that = this;

            require(['views/flowersHandler-T'], function (handlerView) {
                var view = new handlerView();

                that.$el.append(view.render().$el);
            });
        }
    });

    return new flowerView();
});