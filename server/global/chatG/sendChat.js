
const { sendSystem } = require('./sendSystem');
const { sendPrivate } = require('./sendPrivate');
const { sendGang } = require('./sendGang');
const { sendIntersect } = require('./sendIntersect');
const { sendRanks } = require('./sendRanks');
const { sendWorld } = require('./sendWorld');
const { sendBroadcast } = require('./sendBroadcast');
module.exports = {
    /**
     * 发送信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} type 消息类型(0:系统,1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
     * @param {*} text 发送的内容
     * @param {*} data.name 可选,发送人名称
     * @param {*} data.t_role 可选,目标id(私聊)
     */
    sendChat: function (req, res, type, text, { name, t_role }) {
        if (type === 0) {
            return sendSystem(text);
        }
        if (type === 1) {
            return sendPrivate(req, res, text, t_role);
        }
        if (type === 2) {
            return sendGang(req, res, text);
        }
        if (type === 3) {
            return sendIntersect(req, res, text);
        }
        if (type === 4) {
            return sendRanks(req, res, text);
        }
        if (type === 5) {
            return sendWorld(req, res, text);
        }
        if (type === 6) {
            return sendBroadcast(req, res, text, name);
        }
    }
}