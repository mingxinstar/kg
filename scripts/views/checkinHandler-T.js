/**
 * 考勤操作面板
 *
 * @author mingxin.huang
 * @update 2015.06.10
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),

        core = require('base/core'),
        kd = require('models/kd'),
        checkinModel = require('models/checkin'),
        checkinCollection = require('collections/checkinList-T'),
        handlerTmpl = require('text!templates/checkin/handler.html');

    var checkinHandlerView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler',
        events : {
            'tap li' : 'toggleSelect',
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'confirm'
        },
        initialize : function () {
        },
        render : function () {
            var allChildren = kd.getChildren(),
                absencChildren = checkinCollection.getTodayAbsence();

            this.$el.html(template(handlerTmpl, {children : allChildren}));

            return this;
        },
        close : function () {
            this.remove();
        },
        toggleSelect : function (e) {
            var $this = $(e.currentTarget);

            $this.toggleClass('selected');
        },
        confirm : function () {
            var $selects = this.$('.selected'),
                childIds = [];

            $selects.each(function (index, li) {
                childIds.push($(li).data('id'));
            });

            if (childIds.length === 0) {
                return;
            }

            var cm = new checkinModel();

            cm.create(childIds);

            this.close();
        }
    });

    return checkinHandlerView;
});