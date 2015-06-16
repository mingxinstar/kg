/**
 * 家长事件提醒集合
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (rquire) {
    var backbone = require('backbone'),

        core = require('base/core'),
        reminderModel = require('models/reminder')

    var reminderList = backbone.Collection.extend({
        url : 'child/reminds/history/100/1',
        sync : core.sync,
        model : reminderModel,
        initialize : function () {
            this.fetch();
        },
        parse : function (res) {
            return res.data;
        }
    });

    return new reminderList();
});