/**
 * 教师相册视图增加修改描述和删除功能
 *
 * @author mingxin.huang
 * @update 2015.06.02
 */

define(function (require) {
    var core = require('base/core'),
        albumView = require('views/album');

    var albumTeacherView = albumView.extend({
        events : {
            'touchstart .fa-trash-o' : 'delFeed',
            'touchstart .album-desc-area' : 'showEdit',
            'keypress input' : 'editDesc'
        },
        initialize : function () {
            // core.debug('initialize albumTeacherView');
        },
        delFeed : function () {
            core.debug('del');
        },
        showEdit : function () {
            core.debug('showEdit');
        },
        editDesc : function () {
            core.debug('editDesc');
        }
    });

    return albumTeacherView;
});