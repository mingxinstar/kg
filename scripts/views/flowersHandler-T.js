/**
 * 加红花操作面板
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        _ = require('underscore'),

        core = require('base/core'),
        kd = require('models/kd'),
        todayList = require('collections/flowersTodayList-T'),
        todayModel = require('models/flowers-T'),
        handlerTmpl = require('text!templates/flowers/handler.html');

    var handlerView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-flower-add',
        events : {
            'tap li' : 'toggleSelect',
            'tap .btn-handle-cancel' : 'close',
            'tap .btn-handle-confirm' : 'confirm'
        },
        initialize : function () {
            this.model = todayList.get(kd.getUserId());
        },
        render : function () {
            var allChildren = kd.getChildren(),
                getedChildren = todayList.getChildren(),
                children = _.reject(allChildren, function (child) {
                    var sameChild = _.find(getedChildren, function (childId) {
                        return child._id === childId;
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

            this.model.add(childIds);

            this.close();
        }
    });

    return handlerView;
});