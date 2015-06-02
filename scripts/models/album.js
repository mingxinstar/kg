/**
 * 相册单个数据model,用于主播对某条记录进行修改和删除
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core');

    var albumModel = backbone.Model.extend({
        urls : {
            delAlbum : 'album/del_album/{album_id}',
            delPic : 'album/del_pic/{album_id}/{pic_key}',
            editDesc : 'album/desc/{album_id}'
        },
        /**
         * 删除相册
         */
        delAlbum : function () {
            core.debug('delAlbum : ', this);
            // this.destroy();
        },
        delPic : function () {
            
        }
    });


});