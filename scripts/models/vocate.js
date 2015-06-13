/**
 * 请假model
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        kd = require('models/kd');

    var vocateModel = backbone.Model.extend({
        url : 'leave_apply/approve/{leave_appply_id}',
        sync : core.sync,
        initialize : function () {
            this.set('id', this.get('_id'));
        },
        /**
         * 同意请假
         * @return {[type]} [description]
         */
        agree : function () {
            this.save({
                audit : kd.getUserId()
            }, {
                data : {
                    leave_appply_id : this.get('_id')
                }
            });
        }
    });

    return vocateModel;
});