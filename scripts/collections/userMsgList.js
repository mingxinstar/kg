/**
 * 用户留言列表
 *
 * @author mingxin.huang
 * @update 2015.07.07
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core');

    var msgList = backbone.Collection.extend({
        url : 'mail_box/list',
        // url : 'mail_box/list/10/{page}',
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

    return new msgList();
});
