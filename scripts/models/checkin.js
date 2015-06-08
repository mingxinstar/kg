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
        url : 'class/absence/del/{ab_id}',
        sync : core.sync,
        /**
         * 删除考勤
         */
        del : function () {
            this.destroy({
                data : {
                    ab_id : this.get('_id')
                }
            });
        }
    });

    return checkinModel;
});