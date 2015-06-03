/**
 * 教师提醒模块
 *
 * @author mingxin.huang
 * @update 2015.06.03
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        reminderListCollection = require('collections/reminderList-T');

    var reminderListView = backbone.Model.extend({
        el : '.app-view-reminder',
        collection : reminderListCollection,
        initialize : function () {
            this.listenTo(this.collection, 'add', this.addOne);
        }
        addOne : function (model) {
            
        }
    });
});