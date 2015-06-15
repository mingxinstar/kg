/**
 * 通讯录审核item
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        authModel = require('models/auth'),
        authTmpl = require('text!templates/contacts/auth.html'),
        commonTmpl = require('text!templates/contacts/commonItem.html');

    var authView = backbone.View.extend({
        tagName : 'li',
        className : 'clearfix',
        events : {
            'tap .btn-success' : 'pass',
            'tap .btn-default' : 'reject'
        },
        initialize : function (child, type) {
            this.type = type || 'childs';

            this.model = new authModel(child, this.type);

            this.listenTo(this.model, 'change', this.render);

            this.listenTo(this.model, 'destroy', this.remove);
        },
        render : function () {
            var data = this.model.toJSON(),
                tmpl = data.isPass === 1 ? commonTmpl : authTmpl;

            this.$el.html(template(tmpl, {data : data}));

            if (data.isPass === 1) {
                this.$el.addClass('common-item');
            }

            return this;
        },
        pass : function () {
            this.model.pass();
        },
        reject : function () {
            this.model.reject();
        }
    });

    return authView;
});