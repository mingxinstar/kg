/**
 * 教师今日考勤列表
 *
 * @author mingxin.huang
 * @update 2015.06.08
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        checkinModel = require('models/checkin');

    var checkinList = backbone.Collection.extend({
        url : 'class/absence/{date}',
        sync : core.sync,
        initialize : function () {
            this.load();
        },
        load : function (date) {
            date = date || core.formatTime('yyyy-MM-dd');

            this.fetch({
                data : {
                    date : date
                },
                reset : true
            });
        }
    });

    return new checkinList();
});