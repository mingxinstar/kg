/**
 * 单条消息view
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        msgModel = require('models/msg'),
        itemTmpl = require('text!templates/msg/item.html');

    var msgItem = backbone.View.extend({
        tagName : 'li',
        className : 'msg-list-item clearfix',
        events : {
            'tap .fa-trash-o' : 'del'
        },
        initialize : function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render : function () {
            this.$el.html(template(itemTmpl, {data : this.model.toJSON()}));
            this.$el.data('id', this.model.get('id'));

            return this;
        },
        del : function () {
            this.model.del();
        }
    });

    return msgItem;
});