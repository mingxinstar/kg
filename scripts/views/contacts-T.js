/**
 * 教师通讯录模块，还负责审核等功能
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),
        touch = require('touch'),

        core = require('base/core'),

        baseTmpl = '\
            <div class="app-view-top-nav">\
                <ul class="clearfix fa-sz-2x">\
                    <li class="active" data-type="parent"><span>学生</span></li>\
                    <li data-type="teacher"><span>教师</span></li>\
                </ul>\
            </div>\
            <div class="app-content-panel clearfix">\
                <div class="contacts-panel-parent"><ul></ul></div>\
                <div class="contacts-panel-teacher"><ul></ul></div>\
            </div>\
        ';

    var contactsList = backbone.View.extend({
        el : '.app-view-contacts',
        events : {
            'tap .app-view-top-nav li' : 'changePanel'
        },
        initialize : function () {
            core.loadCss('contacts');

            this.$('.app-view-content').html(baseTmpl);

            this.$panel = this.$('.app-content-panel');

            this.changeView();
        },
        changeView : function (viewName) {
            viewName = viewName || 'parent';

            if (viewName === 'parent') {
                require(['views/contactsList-T']);
            } else {
                require(['views/contactsListT-T']);
            }
        },
        /**
         * 切换面板
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        changePanel : function (e) {
            var $li = $(e.currentTarget),
                type = $li.data('type');

            $li.addClass('active').siblings().removeClass('active');
            this.$panel.removeClass('show-teacher');

            if (type !== 'parent') {
                this.$panel.addClass('show-'+type);
            }

            this.changeView(type);
        },
    });

    return new contactsList();
});