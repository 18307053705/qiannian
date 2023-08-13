
const { chatGlobal } = require('./config');
module.exports = {
    getChatSocializeGlobal: function (socialize, type) {
        const { gang = {}, intersect = {}, ranks = {} } = socialize;
        const { id: gangId, name: gangName } = gang;
        const { id: intersectId, name: intersectName } = intersect;
        const { id: ranksId, name: ranksName } = ranks;
        const gangChat = gangId ? chatGlobal['gang'][gangId] : '';
        const intersectIdChat = intersectId ? chatGlobal['intersect'][intersectId] : '';
        const ranksChat = ranksId ? chatGlobal['ranks'][ranksId] : '';

        const readId = {
            2: gangId,
            3: intersectId,
            4: ranksId,
        }[type];

        const socializeName = {
            2: gangName,
            3: intersectName,
            4: ranksName,
        }[type];

        const chatInfo = {
            2: gangChat,
            3: intersectIdChat,
            4: ranksChat,
        }[type];

        return {
            gangChat,
            intersectIdChat,
            ranksChat,
            readId,
            chatInfo,
            socializeName
        }
    }
}