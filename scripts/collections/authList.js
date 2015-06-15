/**
 * 审核列表结合
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var authList = backbone.Collection.extend({
        url : 'teacher/unaudited/list/{type}',
        sync : core.sync,
        parse : function (res) {
            var data = res.data,
                childIds = [];

            for (var i = 0, l = data.length; i < l; i++) {
                childIds.push({
                    _id : data[i]
                });
            }

            return childIds;
        },
        initialize : function (type) {
            type = type || 'childs';

            this.type = type;
        },
        load : function () {
            this.fetch({
                data : {
                    type : this.type
                },
                reset : true
            });
        }
    });

    return authList;
});