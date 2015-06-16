/**
 * 家长红花列表
 *
 * @author mingxin.huang
 * @update 2016.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core');

    var flowerList = backbone.Collection.extend({
        url : 'class/flowers/history/10/{page}',
        sync : core.sync,
        currPage : 1,
        isLastPage : false, //是否最后一页
        isSyncing : false, //是否在同步数据
        initialize : function () {
            this.on('sync', function () {
                this.isSyncing = false;
            });
        },
        parse : function (res) {
            if (res.data.length < 10) {
                this.isLastPage = true;
            }

            return res.data;
        },
        /**
         * 加载数据
         */
        load : function () {
            if (this.isLastPage || this.isSyncing) {
                return;
            }

            this.isSyncing = true;

            this.fetch({
                data : {
                    page : this.currPage
                }
            });

            this.currPage++;
        }
    });

    return new flowerList(); 
});