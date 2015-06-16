/**
 * 红花月度数据集合
 *
 * @auhthor mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');


    var monthList = backbone.Collection.extend({
        url : 'class/flower/child_history/{month}',
        sync : core.sync,
        parse : function (res) {
            var data = res.data || [],
                dateAry = [];

            for (var i = 0; i < data.length; i++) {
                dateAry.push({
                    date : data[i]
                });
            }

            return dateAry;
        },
        initialize : function () {

        },
        load : function (month) {
            month = month || core.formatTime(null, 'yyyy-MM');

            this.fetch({
                data : {
                    month : month
                },
                reset : true
            });
        }
    });

    return new monthList();
});