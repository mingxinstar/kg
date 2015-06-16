/**
 * 详细考勤collection
 *
 * @author mingxin.huang
 * @update 2015.06.13
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var detailList = backbone.Collection.extend({
        url : 'child/absence/month_report/{month}/{child_id}',
        sync : core.sync,
        parse : function (res) {
            return res.data;
        },
        initialize : function (childId, month) {
            this.childId = childId;
            this.month = month || core.formatTime(null, 'yyyy-MM');
        },
        load : function (month) {
            this.fetch({
                data : {
                    month : month || this.month,
                    child_id : this.childId
                },
                reset : true
            });
        },
        getAbsenceData : function (day) {
            var list = this.toJSON(),
                data = null,
                date = this.month + '-' + (day < 10 ? '0' + day : day);

            for (var i = 0, l = list.length; i < l; i++) {
                var tmpData = list[i];

                if (tmpData.date.indexOf(date) > -1) {
                    data = tmpData;
                    break;
                }
            }

            data.child_id = this.childId;
            return data;
        }
    });

    return detailList;
});