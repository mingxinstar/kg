/**
 * 消息详细信息model
 *
 * @author mingxin.huang
 * @update 2015.06.14
 */

define(function (require) {
    var backbone = require('backbone'),

        core = require('base/core'),
        kd = require('models/kd');

    var detailModel = backbone.Model.extend({
        urls : {
            info : 'class/msg_down/info/{msg_id}',
            vote : 'class/msg_down/vote/{msg_id}/{index}',
            chat : 'class/msg_down/chat/{msg_id}'
        },
        sync : core.sync,
        parse : function (res) {
            return res.data;
        },
        initialize : function (msgId) {
            this.set('id', msgId);
        },
        load : function () {
            this.fetch({
                url : this.urls.info,
                data : {
                    msg_id : this.get('id')
                }
            });
        },
        vote : function (value) {
            var vote = this.get('vote'),
                poll = vote.poll || {},
                currAry = poll[value] || [];

            currAry.push(kd.getUserId());
            poll[value] = currAry;
            vote.poll = poll;

            this.save({'vote' : vote}, {
                url : this.urls.vote,
                data : {
                    msg_id : this.get('id'),
                    index : value
                }
            });

            this.trigger('change');
        },
        hasVoted : function () {
            var data = this.toJSON(),
                poll = data.vote.poll;

            if (!poll) {
                return false;
            }

            var pollAry = [];
            for (var key in poll) {
                pollAry = pollAry.concat(poll[key]);
            }

            return pollAry.indexOf(kd.getUserId()) > -1;
        },
        getVoteCount : function () {
            var data = this.toJSON(),
                poll = data.vote.poll,
                pollCount = 0;

            for (var key in poll) {
                pollCount += poll[key].length;
            }

            return pollCount || 1;
        },
        /**
         * 发言
         * @param  {String} content [description]
         */
        chat : function (content) {
            var chats = this.get('chats') || [],
                userData = kd.getCurrData(),
                chatData = {
                    content : content,
                    ts : new Date().getTime()/1000
                };

            if (kd.isTeacher()) {
                chatData._id = userData._id;
            } else {
                chatData._id = userData.child._id;
                chatData.role = userData.relation;
            };

            chats.unshift(chatData);

            this.save({'chats' : chats}, {
                url : this.urls.chat,
                type : 'POST',
                data : {
                    msg_id : this.get('id'),
                    content : content
                }
            });

            this.trigger('change');
        }
    });

    return detailModel;
});