/**
 * 班级相册列表集合，负责相册数据的处理
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),

        core = require('base/core');


    var albumList = backbone.Collection.extend({
        url : core.getRoot('/crm/album/list/10/1'),
        // url : 'crm/album/list/{size}/{page}',
        sync : core.sync,
        parse : function (res) {
            return res.data;
        }
    });

    return new albumList(); 
});