/**
 * 首页天气模块，负责天气和时间的数据
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),
        core =require('base/core');

    var weatherModel = backbone.Model.extend({
        url : '/crm/get_bdtq/上海',
        sync : core.sync,
        initialize : function () {
            core.debug('weatherModel initialize');

            // this.on('sync', this.syncData);
        },
        syncData : function (model, res, options) {
            core.debug('weatherModel syncData : ', res);

            this.set(res.data);
        }
    });


    return new weatherModel();
});