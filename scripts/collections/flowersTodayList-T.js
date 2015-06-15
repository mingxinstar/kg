/**
 * 今日红花列表集合
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        flowersModel = require('models/flowers-T');

    var todayList = backbone.Collection.extend({
        url : 'class/flower/list',
        sync : core.sync,
        model : flowersModel,
        parse : function (res) {
            var data = res.data ? (res.data.flowers || {}) : {},
                dataAry = [];

            for (var key in data) {
                dataAry.push({
                    teacher_id : key,
                    child_ids : data[key]
                });
            }

            return dataAry;
        },
        initialize : function () {
        },
        load : function () {
            this.fetch();
        },
        /**
         * 获取已经获取红花的学生
         * @return {[type]} [description]
         */
        getChildren : function () {
            var data = this.toJSON(),
                childIds = [];

            for (var i = 0, l = data.length; i < l; i++) {
                childIds = childIds.concat(data[i].child_ids);
            }

            return childIds;
        }
    });

    return new todayList();
});