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
        id : 1,
        url : 'get_storage',
        localStorage : new localStorage("kd-info"),
        initialize : function () {
            var storageData = this.localStorage.find(this);
            if (storageData) {
                this.defaults = storageData;
            }

            this.fetch({
                success : function (model) {
                    model.localStorage.create(model);
                }
            });
        },
        sync : core.sync,
        parse : function (res) {
            return res.storage;
        },
        /**
         * 获取当前用户的数据
         * @param {String}  type 数据类别
         * @return {Object} 返回当前用户的数据
         */
        getCurrData : function (type) {
            type = type || 'user';

            var key = '_id',
                currData = this.get('curr');

            if (type === 'class') {
                key = 'class_id';
            } else if (type === 'kg') {
                key = 'kg_id';
            }

            return this.get(currData[key]);
        },
        /**
         * 获取当前用户的ID
         * @return {String} 用户ID
         */
        getUserId : function () {
            return this.get('curr')._id;
        },
        /**
         * 是否是自己
         * @param  {Number}  user_id 用户ID
         * @return {Boolean}         [description]
         */
        isSelf : function (user_id) {
            return user_id === this.getUserId();
        },
        /**
         * 是否是教师
         * @param  {Number}  user_id 用户ID
         * @return {Boolean}         [description]
         */
        isTeacher : function (user_id) {
            user_id = user_id || this.getUserId();

            var teachers = this.getCurrData('kg').teacher_ids;

            return teachers.indexOf(user_id) > -1;
        }
    });

    return new kdModel();
});