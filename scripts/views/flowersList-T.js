/**
 * 单条红花view
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),

        listTmpl = require('text!templates/flowers/list.html');

    var flowersList = backbone.View.extend({
        tagName : 'li',
        className : 'clearfix',
        initialize : function () {

        },
        render : function () {
            this.$el.html(template(listTmpl, {data : this.model.toJSON()}));

            return this;
        }
    });

    return flowersList;
});