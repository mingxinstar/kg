/**
 * 教师考勤model
 *
 * @author mingxin.huang
 * @update 2015.06.08
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var checkinModel = backbone.Model.extend({
        urls : {
            del : 'class/absence/del/{ab_id}',
            create : 'class/absence/create'
        },
        sync : core.sync,
        initialize : function () {
            this.set('id', this.get('_id'));
        },
        /**
         * 创建新的考勤
         * @return {[type]} [description]
         */
        create : function (childIds) {
            var today = core.formatTime(null, 'yyyy-MM-dd'),
                data = {
                    date : today,
                    child_ids : childIds
                };

            this.save(data, {
                type : 'POST',
                url : this.urls.create,
                data : data
            });
        },
        /**
         * 删除考勤
         */
        del : function () {
            core.debug('del : ', this.get('_id'));

            this.destroy({
                url : this.urls.del,
                data : {
                    ab_id : this.get('_id')
                }
            });
        }
    });

    return checkinModel;
});