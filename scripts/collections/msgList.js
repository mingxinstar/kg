/**
 * 班级消息列表集合
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        msgModel = require('models/msg');

    var msgList = backbone.Collection.extend({
        url : 'class/msg_down/history/10/{page}',
        sync : core.sync,
        model : msgModel,
        currPage : 1,
        isLastPage : false, //是否最后一页
        isSyncing : false, //是否在同步数据
        initialize : function () {
            core.loadCss('msg');

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