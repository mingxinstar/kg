/**
 * 首页试图，主要负责用户数据的展示
 *
 * @author mingxin.huang
 * @update 2015.05.30
 */

define(function (require) {
    var backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('zepto'),
        template = require('template'),

        core = require('base/core'),
        kdModel = require('models/kd'),
        weatherModel = require('models/weather'),
        wrapView = require('views/wrap'),
        weatherTmpl = require('text!templates/index/weather.html');

    var indexView = backbone.View.extend({
        el : '.view-index-header',
        model : kdModel,
        model2 : weatherModel,
        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model2, 'change', this.renderWeather);

            this.model.fetch();
            this.model2.fetch();
        },
        render : function () {
            // core.debug('avatar render');

            wrapView.closeAll();

            if (!this.model.hasChanged()) {
                return this;
            }

            // core.debug('index render : ', this.model.toJSON());
            this.$('.index-header-avatar img').attr('src', core.getAvatar(this.model.getUserId()));


            return this;
        },
        renderWeather : function () {
            core.debug('weather : ', this.model2.toJSON());

            this.$('.index-header-weather').html(template(weatherTmpl, this.model2.toJSON()));
        }
    });

    var currIndexView = new indexView();

    // exports = currIndexView;
    return currIndexView;
});