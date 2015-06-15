/**
 * 今日红花model
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var flowerModel = backbone.Model.extend({
        urls : {
            add : 'class/flower/add/{child_id}',
            del : 'class/flower/del/{child_id}'
        },
        sync : core.sync,
        initialize : function () {
            this.set('id', this.get('teacher_id'));
        },
        add : function (childId) {
            var childIds = this.get('child_ids');

            childIds = childIds.concat(childId);

            this.save({
                child_ids : childIds
            }, {
                url : this.urls.add,
                data : {
                    child_id : childId
                }
            });
        },
        del : function (childId) {
            var childIds = this.get('child_ids');

            childIds.splice(childIds.indexOf(childId), 1);

            this.save({
                child_ids : childIds
            }, {
                url : this.urls.del,
                data : {
                    child_id : childId
                }
            });
        }
    });

    return flowerModel;
});