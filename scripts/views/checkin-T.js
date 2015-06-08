/**
 * 教师考勤总视图
 *
 * @author mingxin.huang
 * @update 2015.06.05
 */

define(function (require) {
    var backbone = require('backbone'),
        kd = require('models/kd'),

        core = require('base/core'),
        baseTmpl = require('text!templates/checkin/base.html');

    var checkInView = backbone.View.extend({
        el : '.app-view-checkin',
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

            core.debug('panel : ', $('.checkin-panel-today'));

            return this;
        },
        changeView : function (viewName) {
            viewName = viewName || 'today';

            core.debug('changeView');

            // if (1 > 2) {
                require(['views/checkinToday-T'], function () {

                });
            // }
        }
    });

    return new checkInView();
});