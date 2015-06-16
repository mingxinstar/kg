/**
 * 家长提醒model
 *
 * @author mingxin.huang
 * @udpate 2015.06.03
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core'),
        kd = require('models/kd');

    var reminderModel = backbone.Model.extend({
        urls : {
            create : 'child/reminds',
            del : 'child/reminds/del/{remind_id}'
        },
        sync : core.sync,
        initialize : function () {
            if (this.get('_id')) {
                this.set('id', this.get('_id'));
            }
        },
        /**
         * 创建新提醒
         * @param  {[type]} teacherIds [description]
         * @param  {[type]} alarm      [description]
         * @param  {[type]} content    [description]
         */
        create : function (teacherIds, alarm, content) {
            var data = {
                    teacher_ids : teacherIds,
                    alarm : alarm,
                    title : content
                },
                saveData = {
                    parent_id : kd.getUserId(),
                    child_id : kd.getCurrData().child._id,
                    isNew : true
                },
                that = this;

            _.extend(saveData, data);

            this.save(saveData, {
                url : this.urls.create,
                type : 'POST',
                data : data,
                success : function (model, res) {
                    that.set({
                        '_id' : res.data._id,
                        'id' : res.data._id
                    });
                }
            });
        },
        del : function () {
            this.destroy({
                url : this.urls.del,
                data : {
                    remind_id : this.get('_id')
                }
            });
        }
    });

    return reminderModel;
});