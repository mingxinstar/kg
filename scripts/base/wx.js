/**
 * 微信模块，负责微信的操作
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var weixin = require('weixin'),
        config = require('base/config'),
        core = require('base/core');

    var ACTION = 'http://'+config.root.api+'/wx/signature/sign?timestamp={timestampl}&url={url}';


    var _isReady = false;
    // 配置微信相关设置
    function init () {
        var url = location.href.split('#')[0],
            ts = Math.round(new Date().getTime()/1000),
            fn = function (res) {
                var data = res.data;

                weixin.config({
                    debug : true,
                    appId : config.appId,
                    timestamp : ts,
                    nonceStr : data.nonceStr,
                    signature : data.signature,
                    jsApiList : ['chooseImage']
                });

                weixin.ready(function () {
                    core.debug('ready');
                });
            };

        core.getResult({
            url : ACTION,
            data : {
                timestamp : ts,
                url : url
            },
            success : fn
        });
    }

    /**
     * 选择图片
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    function chooseImage (callback) {
        weixin.chooseImage({
            success : function (res) {
                var localIds = res.localIds;

                core.debug('localIds : ', localIds);

                if (typeof callback === 'function') {
                    callback(localIds);
                }
            }
        });
    }

    /**
     * 上传图片
     * @param  {[type]} localIds [description]
     * @return {[type]}         [description]
     */
    function uploadImage (localIds, callback) {
        var serverIds = [];

        for (var i = 0; i < localIds.length; i++) {
            weixin.uploadImage({
                localId : localIds[i],
                isShowProgressTips : 1,
                success : function (res) {
                    serverIds.push(res.serverId);

                    if (serverIds.length === localIds.length && typeof callback === 'function') {
                        callback(serverIds);
                    }
                }
            });
        }
    }

    /**
     * 预览图片
     * @param  {[type]} current [description]
     * @param  {[type]} imgs    [description]
     * @return {[type]}         [description]
     */
    function previewImage (current, imgs) {
        for (var i = 0, l = imgs.length; i < l; i++) {
            var img = imgs[i];

            if (img.indexOf('http') < 0) {
                imgs[i] = core.getImg(img);
            }
        }

        weixin.previewImage({
            current : current,
            urls : imgs
        });
    }

    return {
        init : init,
        chooseImage : chooseImage,
        uploadImage : uploadImage,
        previewImage : previewImage
    };
});