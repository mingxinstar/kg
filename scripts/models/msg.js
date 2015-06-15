/**
 * 消息model
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core'),
        kd = require('models/kd');

    var msgModel = backbone.Model.extend({
        urls : {
            add : 'class/msg_down/add',
            del : 'class/msg_down/del/{msg_id}'
        },
        sync : core.sync,
        initialize : function () {
            this.set('id', this.get('_id'));
        },
        create : function (options) {
            options = _.extend({
                title : '标题',
                content : '说明',
                pics : [],
                vote : {
                    items : []
                },
                teacher_id : kd.getUserId(),
                ts : Math.round(new Date().getTime()/1000),
                isNew : true
            }, options);

            this.save(options, {
                url : this.urls.add,
                type : 'POST',
                data : options
            })
        },
        del : function () {
            this.destroy({
                url : this.urls.del,
                data : {
                    msg_id : this.get('_id')
                }
            });
        }
    });

    return msgModel;
});