/**
 * 教师考勤总视图
 *
 * @author mingxin.huang
 * @update 2015.06.05
 */

define(function (require) {
    var backbone = require('backbone'),
        kd = require('models/kd'),
        touch = require('touch'),

        core = require('base/core'),
        baseTmpl = require('text!templates/checkin/base.html');

    var checkInView = backbone.View.extend({
        el : '.app-view-checkin',
        events : {
            'tap .app-view-nav li' : 'changePanel',
            'tap .app-view-nav-bar > .btn' : 'showHandler'
        },
        initialize : function () {
            core.loadCss('checkin-T');

            this.$content = this.$('.app-view-content');

            this.$content.empty();

            this.render();

            this.changeView();
        },
        render : function () {
            this.$content.html(baseTmpl);

            this.$panel = this.$content.find('.checkin-content-panel');

            return this;
        },
        changeView : function (viewName) {
            viewName = viewName || 'today';

            if (viewName === 'today') {
                require(['views/checkinTodayList-T']);
            } else if (viewName === 'vocate') {
                require(['views/checkinVocateList-T']);
            } else {
                require(['views/checkinReport-T']);
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
            this.$panel.removeClass('show-vocate show-report');

            if (type !== 'today') {
                this.$panel.addClass('show-'+type);
            }

            this.changeView(type);
        },
        /**
         * 显示考勤添加面板
         */
        showHandler : function () {
            var that = this;

            require(['views/checkinHandler-T'], function (handlerView) {
                var view = new handlerView();

                that.$el.append(view.render().$el);
            });
        }
    });

    return new checkInView();
});