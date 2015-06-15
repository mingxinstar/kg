/**
 * 当日红花单个老师发放情况
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        touch = require('touch'),

        core = require('base/core'),
        todayModel = require('models/flowers-T'),
        todayTmpl = require('text!templates/flowers/today.html');

    var todayView = backbone.View.extend({
        tagName : 'li',
        className : 'clearfix',
        model : todayModel,
        isShowDel : false,
        events : {
            'tap .btn-del-child' : 'toggleDel',
            'tap .fa-times-circle' : 'delChild'
        },
        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render : function () {
            var data = this.model.toJSON();
            data.isShowDel = this.isShowDel;

            this.$el.html(template(todayTmpl, {data : data}));

            return this;
        },
        toggleDel : function () {
            this.isShowDel = !this.isShowDel;
            this.$('.today-children-list').toggleClass('show-del');
        },
        delChild : function (e) {
            var $this = $(e.target),
                $li = $this.parent(),
                childId = $li.data('id');

            this.model.del(childId);
        }
    });

    return todayView;
});