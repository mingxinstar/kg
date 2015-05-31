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

    return {
        getRoot   : getRoot,
        isRelease : isRelease,
        debug     : debug,
        sync      : sync,
        getAvatar : getAvatar
    };
 });