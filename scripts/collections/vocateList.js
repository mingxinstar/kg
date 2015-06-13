/**
 * 请假审核列表集合
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        vocateModel = require('models/vocate');

    var vocateList = backbone.Collection.extend({
        url : 'leave_apply/list/10/{page}',
        sync : core.sync,
        model : vocateModel,
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

    return new vocateList();
});