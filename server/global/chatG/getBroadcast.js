
const { chatGlobal } = require('./config');

module.exports = {
    /**
     * 获取广播信息
     * @param {*} req 
     * @param {*} res 
     * @returns list [{ t: '内容', n: "发送角色名", s: '发送时间' }]
     */
    getBroadcast: function () {
        return {list:chatGlobal['broadcast']};
    }
}