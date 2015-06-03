/**
 * 老师提醒model
 *
 * @author mingxin.huang
 * @udpate 2015.06.03
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var reminderModel = backbone.Model.extend({
        url : 'teacher/reminds/process',
        update : function (reply) {
            reply = reply || '已阅';

            this.save('audit', 1, {
                url : this.url,
                type : 'POST',
                data : {
                    remind_id : this.get('_id'),
                    reply : reply
                }
            });
        }
    });

    return reminderModel;
});