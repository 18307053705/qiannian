
const { chatGlobal, CHAT_TYPE_MEUN } = require('./config');
module.exports = {
    setChatReadGlobal: function (type, chatId, readId) {
        if (type === 1) {
            chatGlobal['private'][chatId]['read'] = true;
        }
        if ([2, 3, 4].includes(type)) {
            chatGlobal[CHAT_TYPE_MEUN[type]][chatId]['read'].push(readId);
        }
    }
}