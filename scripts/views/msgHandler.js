/**
 * 教师创建通知模块
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),
        template = require('template'),
        _ = require('underscore'),
        touch = require('touch'),

        core = require('base/core'),
        wx = require('base/wx'),
        msgModel = require('models/msg'),
        msgList = require('collections/msgList'),
        handlerTmpl = require('text!templates/msg/handler.html'),
        imgTmpl = '\
            <% for (var i = 0, l = list.length; i < l; i++) { %>\
                <li>\
                    <img src="<%=list[i]%>" alt="" />\
                    <i class="fa fa-minus-circle fa-2x color-red"></i>\
                </li>\
            <% } %>\
        ',
        voteTmpl = '\
            <li class="clearfix">\
                <span><%=index%></span>\
                <input type="text" name="vote-item-<%=index%>" placeholder="请输入投票选项">\
                <i class="fa fa-times fa-2x"></i>\
            </li>\
        '

    var handlerView = backbone.View.extend({
        tagName : 'div',
        className : 'app-view-handler app-view-msg-create',
        collection : msgList,
        events : {
            'tap .app-view-nav-bar .btn-handle-cancel' : 'close',
            'tap .app-view-nav-bar .btn-handle-confirm' : 'submit',
            'tap .pic-select' : 'chooseImage',
            'tap .pic-select-area .fa-minus-circle' : 'delImg',
            'tap .btn-add-vote' : 'addVote',
            'tap .vote-area .fa-times' : 'delVote',
            'change .vote-toggle-area input' : 'toggleVote'
        },
        localIds : [],
        initialize : function () {
            core.loadCss('msg-T');

            this.$el.html(handlerTmpl);

            this.$form = this.$('form');

            this.$voteArea = this.$('.vote-area');
            this.$voteList = this.$voteArea.find('ul');

            wx.init();
        },
        close : function () {
            this.remove();
        },
        submit : function () {
            var data = this.$form.serializeArray(),
                options = {
                    title : data[0].value,
                    content : data[1].value
                };

            if (data[2].value === '1') {
                var items = [];

                for (var i = 3, l = data.length; i < l; i++) {
                    if (data[i].value) {
                        items.push(data[i].value);
                    }
                }

                options.vote = {
                    items : items
                }
            }

            var that = this,
                fn = function () {
                    var newModel = new msgModel();

                    newModel.create(options);

                    that.collection.add(newModel);
                };

            if (this.localIds.length > 0) {
                wx.uploadImage(this.localIds, function (serverIds) {
                    options.pics = serverIds;

                    fn();
                });
            } else {
                fn();
            }

            core.debug('data : ', data, options);
            this.close();
        },
        chooseImage : function () {
            var that = this;

            var fn = function (localIds) {
                that.localIds = this.localIds.concat(localIds);

                that.$('.pic-select-area').prepend(template(imgTmpl, {list : localIds}));
            };

            wx.chooseImage(fn);
        },
        /**
         * 删除图片
         * @param  {[type]} e [description]
         */
        delImg : function (e) {
            var $this = $(e.currentTarget),
                $img = $this.siblings('img'),
                $li = $this.parent(),
                localId = $img.attr('src');

            this.localIds.splice(this.localIds.indexOf(localId), 1);

            $li.remove();
        },
        addVote : function () {
            var $votes = this.$voteList.find('li');

            this.$voteList.append(template(voteTmpl, {index : $votes.length+1}));
        },
        delVote : function (e) {
            var $this = $(e.currentTarget),
                $li = $this.parent();

            $li.remove();

            var $votes = this.$voteList.find('li');

            _.each($votes, function (vote, index) {
                var $currVote = $(vote),
                    currIndex = index+1;

                $currVote.find('span').text(currIndex);
                $currVote.find('input').attr('name', 'vote-item-'+(index+1));
            });
        },
        /**
         * 切换显示投票区域
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        toggleVote : function (e) {
            var $this = $(e.currentTarget),
                value = parseInt($this.val(), 10);

            if (value === 0) {
                this.$voteArea.hide();
            } else {
                this.$voteArea.show();
            }
        }
    });

    return handlerView;
});