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
        kd = require('models/kd'),
        weatherModel = require('models/weather'),
        wrapView = require('views/wrap'),
        weatherTmpl = require('text!templates/index/weather.html');

    var indexView = backbone.View.extend({
        el : '.view-index-header',
        model : kd,
        model2 : weatherModel,
        initialize : function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model2, 'change', this.renderWeather);

            this.model2.fetch();
        },
        render : function () {
            wrapView.closeAll();

            if (!this.model.hasChanged()) {
                return this;
            }

            if (kd.isParent()) {
                var child = kd.getCurrData().child;

                this.$('.view-index-header .ava img').attr('src', core.getAvatar(child._id));
                this.$('.view-index-header a').attr('href', '#user/'+child._id);
            } else {
                this.$('.view-index-header .ava img').attr('src', core.getAvatar(kd.getUserId()));
                this.$('.view-index-header a').attr('href', '#user/'+kd.getUserId());
            }


            return this;
        },
        renderWeather : function () {

            this.$('.index-header-weather').html(template(weatherTmpl, {data : this.model2.toJSON()}));
        }
    });

    return new indexView();
});