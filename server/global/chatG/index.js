
const sendChat = require('./sendChat');
const getChat = require('./getChat');
module.exports = {
    ...sendChat,
    ...getChat
}