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
        // 私聊模板
        private: {
            // '玩家id': {
            //     list: [{ t: '内容', id: '发送角色Id', n: "发送角色名", s: '发送时间' }],
            //     read:false // 是否已读
            // },
        },
        // 帮会模板
        gang: {
            // '帮会id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        // 结义模板
        intersect: {
            // '结义id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        // 队伍模板
        ranks: {
            // '队伍id': {
            //     list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
            //     read:[id] // 已读id
            // },
        },
        // 世界模板
        world: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
        // 广播模板
        broadcast: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
        // 系统模板
        system: [
            // { t: '内容', n: "发送角色名", s: '发送时间' }
        ],
    },
};

