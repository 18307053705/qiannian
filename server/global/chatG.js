const CHAT_TYPE_MEUN = {
    0: 'system',
    1: 'private',
    2: 'gang',
    3: 'intersect',
    4: 'ranks',
    5: 'world',
    6: 'broadcast'
}

module.exports = {
    CHAT_TYPE_MEUN,
    chatGlobal: {
        private: {
            // 私聊模板
            // '玩家id': {
            //     list: [{ t: '内容', id: '发送角色Id', n: "发送角色名", s: '发送时间' }],
            //     read:false // 是否已读
            // },
        },
        gang: {
            // 帮会模板
            // '帮会id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        intersect: {
            // 结义模板
            // '结义id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        ranks: {
            // 队伍模板
            // '队伍id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        // 世界
        world: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
        // 广播
        broadcast: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
        // 系统s
        system: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
    },
    setChatReadGlobal: function (type, chatId, readId) {
        if (type === 1) {
            this.chatGlobal['private'][chatId]['read'] = true;
        }
        if ([2, 3, 4].includes(type)) {
            this.chatGlobal[CHAT_TYPE_MEUN[type]][chatId]['read'].push(readId);
        }
    },
    getChatSocializeGlobal: function (socialize, type) {
        const { gang = {}, intersect = {}, ranks = {} } = socialize;
        const { id: gangId, name: gangName } = gang;
        const { id: intersectId, name: intersectName } = intersect;
        const { id: ranksId, name: ranksName } = ranks;
        const gangChat = gangId ? this.chatGlobal['gang'][gangId] : '';
        const intersectIdChat = intersectId ? this.chatGlobal['intersect'][intersectId] : '';
        const ranksChat = ranksId ? this.chatGlobal['ranks'][ranksId] : '';

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

    },
    snedSystem: function (text) {
        this.chatGlobal['system'].push({
            t:text,
            n:"系统公告",
            s: new Date() * 1,
        });
    }
};

