/**
 * 考勤操作面板
 *
 * @author mingxin.huang
 * @update 2015.06.10
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        _ = require('underscore'),

        core = require('base/core'),
        kd = require('models/kd'),
        checkinModel = require('models/checkin'),
        checkinList = require('collections/checkinList-T'),
        todayListView = require('views/checkinTodayList-T'),
        handlerTmpl = require('text!templates/checkin/handler.html');

    var checkinHandlerView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-checkin-add',
        events : {
            'tap li' : 'toggleSelect',
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'confirm'
        },
        collection : checkinList,
        initialize : function () {
            this.model = new checkinModel();

            this.listenTo(this.collection, 'reset', this.render);

            this.collection.load();
        },
        render : function () {
            var allChildren = kd.getChildren(),
                absencChildren = checkinList.getTodayAbsence(),
                children = _.reject(allChildren, function (child) {
                    var sameChild = _.find(absencChildren, function (abChild) {
                        return abChild.child_id === child._id;
                    });

                    return !!sameChild;
                });

            this.$el.html(template(handlerTmpl, {children : children}));

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

            this.model.create(childIds, function () {
                todayListView.refreshToday();
            });

            this.close();
        }
    });

    return checkinHandlerView;
});