/**
 * 家长通讯录模块
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),
        template = require('template'),

        core = require('base/core'),
        kd = require('models/kd'),
        commonTmpl = require('text!templates/contacts/common.html');

    var listView = backbone.View.extend({
        el : '.app-view-contacts',
        initialize : function () {
            core.loadCss('contacts');

            this.$('.app-view-content').html('<div class="app-content-panel"><ul></ul></div>');
            this.$list = this.$('ul');

            this.render();
        },
        render : function () {
            this.$list.append(template(commonTmpl, {list : kd.getTeachers()}));

            return this;
        }
    });

    return new listView();
});