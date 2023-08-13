
const { chatGlobal } = require('./config');
module.exports = {
    /**
     * 发送系统消息
     * @param {*} text 
     */
    sendSystem: function (text) {
        if (chatGlobal['system'].length >= 200) {
            chatGlobal['world'].splic(0, 1);
        }
        chatGlobal['system'].push({
            t: text,
            n: "系统公告",
            s: parseInt(new Date() / 1000),
        });
        return {
            list:chatGlobal['system']
        }
    }
}