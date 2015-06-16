/**
 * 用户中心用户model
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        kd = require('models/kd');

    var userModel = backbone.Model.extend({
        url : '{type}/profile/update',
        sync : core.sync,
        initialize : function () {
            this.type = kd.isTeacher() ? 'teachers' : 'parents';
        },
        /**
         * 修改名称
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        changeName : function (name) {
            this.save('name', name, {
                type : 'POST',
                data : {
                    name : name,
                    type : this.type === 'teachers' ? 'teachers' : 'childs'
                }
            });
        },
        /**
         * 修改性别
         * @param  {[type]} sex [description]
         * @return {[type]}     [description]
         */
        changeSex : function (sex) {
            sex = parseInt(sex, 10);

            this.save('sex', sex, {
                type : 'POST',
                data : {
                    sex : sex,
                    type : this.type === 'teachers' ? 'teachers' : 'childs'
                }
            });  
        },
        /**
         * 修改电话号码
         * @param  {[type]} phone [description]
         * @return {[type]}       [description]
         */
        changePhone : function (phone) {
            var data = {
                "contact_info": {
                    "mobi": phone
                },
                type : this.type
            };

            this.save(data, {
                type : 'POST',
                data : data
            });
        }
    });

    return userModel;
});