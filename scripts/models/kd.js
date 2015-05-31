/**
 * 幼儿园信息模块，负责信息的查询和处理
 *
 * @author mingxin.huang
 * @update 2015.05.30
 */

define(function (require) {
    var backbone = require('backbone'),
        localStorage = require('backbone.localStorage'),
        core = require('base/core');

    var kdModel = backbone.Model.extend({
        url : '/crm/get_storage',
        localStorage : new localStorage("kd-info"),
        initialize : function () {
            core.debug('kdModel initialize');
        },
        sync : core.sync,
        /**
         * 获取对应的用户或者学校数据
         * @param  {Number} _id 用户id或者学校ID
         * @return {Object}     返回对应的数据
         */
        getData : function (_id) {
            return this.get('storage')[_id];
        },
        /**
         * 获取当前用户的数据
         * @param {String}  type 数据类别
         * @return {Object} 返回当前用户的数据
         */
        getCurrData : function (type) {
            type = type || 'user';

            var key = '_id',
                currData = thsi.get('storage').curr;

            if (type === 'class') {
                key = 'class_id';
            } else if (type === 'kg') {
                key = 'kg_id';
            }

            return this.get('storage')[curr[key]];
        },
        /**
         * 获取当前用户的ID
         * @return {String} 用户ID
         */
        getUserId : function () {
            return this.get('storage').curr._id;
        }
    });

    return new kdModel();
});