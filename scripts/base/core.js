/**
 * 负责基础模块功能
 *
 * @author mingxin.huang
 * @update 2015.05.31
 */

define(function (require) {
    var backbone = require('backbone'),
        config = require('base/config');

    /**
     * 获取对应的请求或者文件地址
     * @param  {String} url  出入的地址
     * @param  {String} type 地址类型
     * @return {String}      拼接好的地址
     */
    function getRoot (url, type) {
        type = type || 'api';

        return 'http://'+config.root[type]+url;
    }

    /**
     * 当前是否是发布版本
     * @return {Boolean} [description]
     */
    function isRelease () {
        return config.mode === 'release';
    }

    /**
     * 调试
     */
    function debug () {
        if (isRelease()) {
            return;
        }

        console.log.apply(console, arguments);
    }

    /**
     * 公用同步数据方法，重写model默认sync方法
     * @param  {[type]} method  [description]
     * @param  {[type]} model   [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function sync (method, model, options) {
        var params = _.extend({
            type : 'GET',
            url : model.url.indexOf('http') > -1 ? model.url : getRoot(model.url),
            processData : false,
            xhrFields : {
                withCredentials : true
            }
        }, options);

        return $.ajax(params);
    }

    /**
     * 获取用户头像地址 
     * @param  {Number} _id 用户ID
     * @return {String}     用户头像地址
     */
    function getAvatar (_id) {
        return getRoot('/avatar/'+_id, 'cdnAvatar');
    }

    /**
     * 获取图片地址
     * @param  {String} key  图片在七牛上的key
     * @param  {String} type 类型 s/m
     * @return {String}      图片地址
     */
    function getImg (key, type) {
        type = type || 's';

        return getRoot(key+'-'+type, 'cdnAvatar');
    }

    /**
     * 格式化时间，按照不同的格式返回不同的字符串
     * @param  {Number} time   时间戳，如果不传，或者为null，则为当前时间
     * @param  {String} format 字符串格式 (Y:年, M:月, D:日, h:小时, m:分钟, s:秒)
     * @return {String}        字符串
     */
    function _formatTime (time,format) {
        format = format || "yyyy-MM-dd hh:mm:ss";

        var datetime = time ? new Date(time) : new Date(),
            o = {
                "M+": datetime.getMonth() + 1, //month
                "d+": datetime.getDate(), //day
                "h+": datetime.getHours(), //hour
                "m+": datetime.getMinutes(), //minute
                "s+": datetime.getSeconds(), //second
                "q+": Math.floor((datetime.getMonth() + 3) / 3), //quarter
                "S": datetime.getMilliseconds() //millisecond
            };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    return {
        getRoot   : getRoot,
        isRelease : isRelease,
        debug     : debug,
        sync      : sync,
        getAvatar : getAvatar,
        getImg : getImg
    };
 });