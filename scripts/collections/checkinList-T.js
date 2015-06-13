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
        todayAbsence : [], //今日缺勤
        initialize : function () {
            this.load();
        },
        load : function (date) {
            date = date || core.formatTime(null, 'yyyy-MM-dd');

            var fn = function (model, res, params) {
                if (params.data.date !== core.formatTime(null, 'yyyy-MM-dd')) {
                    return;
                }

                model.todayAbsence = res.data;
            };

            this.fetch({
                data : {
                    date : date
                },
                reset : true,
                success : fn
            });
        },
        // 返回今日的缺勤学生
        getTodayAbsence : function () {
            return this.todayAbsence;
        },
        parse : function (res) {
            return res.data;
        }
    });

    return new checkinList();
});