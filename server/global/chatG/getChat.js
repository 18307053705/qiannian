const { getSystem } = require('./getSystem');
const { getPrivate } = require('./getPrivate');
const { getGang } = require('./getGang');
const { getIntersect } = require('./getIntersect');
const { getRanks } = require('./getRanks');
const { getWorld } = require('./getWorld');
const { getBroadcast } = require('./getBroadcast');

module.exports = {
    /**
     * 获取信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} type 可选,默认全部,消息类型(0:系统,1:私聊,2:帮会,3:结义,4:队伍,5:世界,6:广播)
     */
    getChat: function (req, res, type, isRead) {
        if (type === 0) {
            return getSystem();
        }
        if (type === 1) {
            return getPrivate(req, res, isRead);
        }
        if (type === 2) {
            return getGang(req, res, isRead);
        }
        if (type === 3) {
            return getIntersect(req, res, isRead);
        }
        if (type === 4) {
            return getRanks(req, res, isRead);
        }
        if (type === 5) {
            return getWorld();
        }
        if (type === 6) {
            return getBroadcast();
        }
        return {
            system: getSystem(),
            world: getWorld(),
            broadcast: getBroadcast(),
            private: getPrivate(req, res, isRead),
            gang: getGang(req, res, isRead),
            intersect: getIntersect(req, res, isRead),
            ranks: getRanks(req, res, isRead),
        }
    }
}