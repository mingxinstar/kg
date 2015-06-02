/**
 * 单条相册的view
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),
        $ = require('zepto'),
        template = require('template'),

        core = require('base/core'),
        albumModel = require('models/album'),
        albumTemplate = require('text!templates/album/list.html');

    var albumView = backbone.View.extend({
        tagName : 'li',
        model : albumModel,
        initialize : function () {
            core.debug('initialize albumView');
        },
        render : function () {
            this.$el.html(template(albumTemplate, {data : this.model.toJSON()}));

            return this;
        }
    });

    return albumView;
});