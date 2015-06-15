/**
 * 宝贝相册model
 *
 * @author mingxin.huang
 * @update 2015.05.16
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core');

    var albumModel = backbone.Model.extend({
        url : 'child_albums/del_pic/{date}/{pic_key}'
        sync : core.sync,
        initialize : function () {
            this.set('id', this.get('_id'));
        },
        del : function (pic_key) {
            var pics = this.get('pics'),
                index = _.findIndex(pics, {
                    pkey : pic_key
                });

            pics.splice(index, 1);

            this.save('pics', pics, {
                data : {
                    date : this.get('date').substr(0, 10),
                    pic_key : pic_key
                }
            });
        }
    });

    return albumModel;
});