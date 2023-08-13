
const { chatGlobal } = require('./config');
module.exports = {
    snedSystem: function (text) {
        chatGlobal['system'].push({
            t: text,
            n: "系统公告",
            s: new Date() * 1,
        });
    }
}