/**
 * 教师今日考勤模块
 *
 * @author mingxin.huang
 * @update 2015.06.08
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),

        core = require('base/core'),
        checkinList = require('collections/checkinList-T'),
        todayTmpl = require('text!templates/checkin/today.html');

    var todayView = backbone.View.extend({
        el : '.checkin-panel-today',
        collection : checkinList,
        initialize : function () {
            this.listenTo(this.collection, 'reset',this.render);

            core.debug('initialize todayTmpl : ', this.$el, $('.checkin-panel-today'));

            this.$el.html(todayTmpl);
        },
        render : function () {

            return this;
        }
    });

    return new todayView();
});