/**
 * 红花数据集合
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var flowersList = backbone.Collection.extend({
        url : 'class/flower/report/{type}',
        sync : core.sync,
        parse : function (res) {
            return res.data;
        },
        initialize : function (type) {
            type = type || 'week';

            this.type = type;
        },
        load : function () {
            this.fetch({
                data : {
                    type : this.type
                }
            });
        }
    });

    return flowersList;
});