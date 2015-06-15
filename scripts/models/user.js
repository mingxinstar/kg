/**
 * 用户中心用户model
 *
 * @author mingxin.huang
 * @update 2015.06.15
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('core');

    var userModel = backbone.Model.extend({
        url : '{type}/profile/update',
        sync : core.sync,
        initialize : function () {
            var type = ''
        }
    });

    return userModel;
});