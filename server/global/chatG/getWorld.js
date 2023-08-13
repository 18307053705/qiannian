
const { chatGlobal } = require('./config');

module.exports = {
    /**
     * 获取世界聊天
     * @param {*} req 
     * @param {*} res 
     * @returns list [{ t: '内容', n: "发送角色名", s: '发送时间' }]
     */
    getWorld: function () {
        return {list:chatGlobal['world']};
    }
}