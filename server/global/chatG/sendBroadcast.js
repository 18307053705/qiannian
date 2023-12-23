
const { chatGlobal } = require('./config');
module.exports = {
    /**
     * 发送广播
     * @param {*} req 
     * @param {*} res 
     * @param {*} text 发送的内容
     * @param {*} name 发送人名称,可选
     * @returns {*} list
     */
    sendbroadcast: function (req, res, text, name) {
        let role_name = name;
        if (!role_name) {
            const role =RoleG.getRoleGlobal(req, res);
            role_name = role.role_name;
        }
        if (chatGlobal['broadcast'].length >= 200) {
            chatGlobal['broadcast'].splic(0, 1);
        }
        chatGlobal['broadcast'].push({
            t: text,
            n: role_name,
            s: parseInt(new Date() / 1000),
        });
        return {list:chatGlobal['broadcast']};
    }
}