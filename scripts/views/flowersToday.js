/**
 * 家长红花单个view
 *
 * @author mingxin.huang
 * @update 2015.06.16
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template');

        core = require('base/core'),
        todayTmpl = '\
            <% var core = require("base/core"), kd = require("models/kd"); %>\
            <p class="fa-sz-2x"><i></i><%=data.date.substr(0,10)%></p>\
            <div class="clearfix">\
                <% for (var key in data.flowers) { var flowers = data.flowers[key]; %>\
                    <% for (var i = 0, l = flowers.length; i < l; i++) { var child = kd.get(flowers[i]); %>\
                        <% if (child) { %>\
                            <div class="ava-area">\
                                <a href="#user/<%=child._id%>" class="ava ava-sm"><img src="<%=core.getAvatar(child._id)%>" alt="" /></a>\
                                <span class="fa-sz-2x"><%=child.name%></span>\
                            </div>\
                        <% } %>\
                    <% } %>\
                <% } %>\
            </div>\
        ';

    var todayView = backbone.View.extend({
        tagName : 'li',
        className : 'clearfix',
        initialize : function () {

        },
        render : function () {
            this.$el.html(template(todayTmpl, {data : this.model.toJSON()}));

            return this;
        }
    });

    return todayView;
});