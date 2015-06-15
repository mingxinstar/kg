/**
 * 审核model
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var authModel = backbone.Model.extend({
        url : 'teacher/audit/{type}/{id}/{status}',
        sync : core.sync,
        initialize : function (data, type) {
            this.set('id', this.get('_id'));
            this.type = type;
        },
        pass : function () {
            this.save({
                isPass : 1
            }, {
                data : {
                    id : this.get('id'),
                    status : 1,
                    type : this.type
                }
            });
        },
        reject : function () {
            this.destroy({
                data : {
                    id : this.get('id'),
                    status : 2,
                    type : this.type
                }
            });
        }
    });

    return authModel;
});