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
                this.set(this.defaults);
            }

            // core.debug('storageData: ', storageData);

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
            user_id = parseInt(user_id, 10);

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
        },
        /**
         * 是否是某个小孩的家长
         * @param  {[type]}  childId [description]
         * @return {Boolean}         [description]
         */
        isParent : function (childId) {
            if (childId) {
                var child = this.get(childId);

                if (!child || !child.parent_ids) {
                    return false;
                }

                return child.parent_ids.indexOf(this.getUserId()) > -1;
            } else {
                return !!this.getCurrData().child;
            }
        },
        /**
         * 获取学生列表数据
         * @return {Array} 学生数据
         */
        getChildren : function () {
            var childIds = this.getCurrData('class').child_ids,
                childrenAry = [];

            var that = this;
            childIds.forEach(function (childId, index) {
                childrenAry.push(that.get(childId));
            });

            return childrenAry;
        },
        /**
         * 返回当前所有的教师
         * @return {Array} [description]
         */
        getTeachers : function () {
            var teacherIds = this.getCurrData('kg').teacher_ids,
                teacherAry = [];

            for (var i = 0, l = teacherIds.length; i < l; i++) {
                var teacher = this.get(teacherIds[i]);
                teacher._id = teacherIds[i];

                teacherAry.push(teacher);
            }

            return teacherAry;
        },
        /**
         * 获取小孩的主要监护人
         * @param  {[type]} childId [description]
         * @return {[type]}         [description]
         */
        getMainParent : function (childId) {
            var child = this.get(childId),
                parentIds = child.parent_ids || [],
                mainParent = null;

            for (var i = 0, l = parentIds.length; i < l; i++) {
                var parent = this.get(parentIds[i]);

                if (parent.main) {
                    mainParent = parent;
                    break;
                }
            }

            mainParent.phone = mainParent.contact_info ? (mainParent.contact_info.mobi || '') : '';

            return mainParent;
        },
        /**
         * 获取称呼
         * @param  {Number} relation 关系代表的数字
         */
        getCall : function (relation) {
            var call = '';

            switch (relation) {
                case 0 :
                    call = '妈妈';
                    break;
                case 1 :
                    call = '爸爸';
                    break;
                case 2 :
                    call = '爷爷';
                    break;
                case 3 :
                    call = '奶奶';
                    break;
                case 4 :
                    call = '叔叔';
                    break;
                case 5 :
                    call = '阿姨';
                    break;
                case 6 :
                    call = '其他';
                    break;
            }

            return call;
        }
    });

    return new kdModel();
});