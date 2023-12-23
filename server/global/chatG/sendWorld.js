
const { chatGlobal } = require('./config');
module.exports = {
    /**
     * 发送世界频道
     * @param {*} req 
     * @param {*} res 
     * @param {*} text 发送的内容
     */
    sendWorld: function (req, res, text) {
        const { role_name } = RoleG.getRoleGlobal(req, res);
        if (chatGlobal['world'].length >= 200) {
            chatGlobal['world'].splic(0, 1);
        }
        chatGlobal['world'].push({
            t: text,
            n: role_name,
            s:  parseInt(new Date() / 1000),
        });
        return {
            list:chatGlobal['world']
        }
    }
}