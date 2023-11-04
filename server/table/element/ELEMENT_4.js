
const TASK_TYPE_MEUN = {
    main: 1,
    exp: 2,
    world: 3,
    tael: 4,
    exploit: 5,
    gang: 6,
    intersect: 7,
    chance: 8,
    copy: 9,
    zudui: 10,
}
const ELEMENT_4 = {
    40: {
        id: 40,
        name: "【世界BOSS】",
        type: 4,
        path: '/worldBoss'
    },
    41: {
        id: 41,
        name: "【妖族守护boss】",
        type: 4
    },
    42: {
        id: 42,
        name: "【仙族守护boss】",
        type: 4
    },
    43: {
        id: 43,
        name: "首次登录抽奖...",
        type: 4,
        cs: "g_b_u",
        path: '/jackpotDay'
    },
    44: {
        id: 44,
        name: "千年古树",
        type: 4,
        cs: "g_b_u",
        path: '/unknownCapability',
        state: { id: 44 }
    },
    45: {
        id: 45,
        name: "全民冲级中...",
        type: 4,
        cs: "g_b_u",
        path: '/jackpotLevel'
    },
    46: {
        id: 46,
        name: "全民神宠...",
        type: 4,
        cs: "g_b_u",
        path: '/lingShouShan'
    },
    47: {
        id: 47,
        name: "全民神装...",
        type: 4,
        cs: "g_b_u",
        path: '/jackpotEquip'
    },
    48: {
        id: 48,
        name: "全民仙法...",
        type: 4,
        cs: "g_b_u",
        path: '/jackpotArt'
    },
    49: {
        id: 49,
        name: "拍卖行",
        type: 4,
        path: '/paiMaiHang'
    },
    410: {
        id: 410,
        name: "店铺",
        type: 4,
        path: '/shopping',
    },
    411: {
        id: 411,
        name: "商城",
        type: 4,
        path: '/shops',
    },
    // 412: {
    //     id: 412,
    //     name: "仓库",
    //     type: 4,
    //     path: '/warehouse',
    //     ext: {
    //         type: 3
    //     }
    // },
    413: {
        id: 413,
        name: "银行",
        type: 4,
        path: '/yinHang',
    },
    414: {
        id: 414,
        name: "铁匠铺",
        type: 4,
        path: '/tieJiangPu'
    },
    415: {
        id: 415,
        name: "【送财童子】",
        type: 4,
        path: '/songCaiTongZi'
    },
    416: {
        id: 416,
        name: "金银岛",
        type: 4,
        path: '/jinYinDao'
    },
    417: {
        id: 417,
        name: "彩灵洞",
        type: 4,
        path: '/caiLingDong'
    },
    418: {
        id: 418,
        name: "帮会管理",
        type: 4,
        path: '/socialize',
        state: { type: 1 }
    },
    419: {
        id: 419,
        name: "庄园管理",
        type: 4,
        path: '/socialize',
        state: { type: 2 }
    },
    420: {
        id: 420,
        name: "队伍管理",
        type: 4,
        path: '/socialize',
        state: { type: 3 }
    },
    421: {
        id: 421,
        name: "洞天福地",
        type: 4,
    },
    422: {
        id: 422,
        name: "进入极北深渊...",
        type: 4,
        path: '/shenYuan',
        cs: "g_b_u"
    },
    423: {
        id: 423,
        name: "发布追杀令",
        type: 4,
        cs: "g_b_u"
    },
    424: {
        id: 424,
        name: "【炼魂洞】",
        type: 4,
        path: '/taskScene',
        taskId: 1,
        taskType: TASK_TYPE_MEUN.copy,
    },
    425: {
        id: 425,
        name: "【黑角域】",
        type: 4,
        path: '/taskScene',
        taskId: 2,
        taskType: TASK_TYPE_MEUN.copy
    },
    426: {
        id: 426,
        name: "【四海龙宫】",
        type: 4,
        path: '/taskScene',
        taskId: 3,
        taskType: TASK_TYPE_MEUN.copy
    },
    427: {
        id: 427,
        name: "【凤凰桐木】",
        type: 4,
        path: '/taskScene',
        taskId: 4,
        taskType: TASK_TYPE_MEUN.copy
    },
    428: {
        id: 428,
        name: "【魔神传说】",
        type: 4,
    },
    429: {
        id: 429,
        name: "【海底魔宫】",
        type: 4,
    },
    430: {
        id: 430,
        name: "【天魔遗址】",
        type: 4,
    },
    431: {
        id: 431,
        name: "【地府传说】",
        type: 4,
    },
    432: {
        id: 432,
        name: "【群魔乱舞】",
        type: 4,
    },
    433: {
        id: 433,
        name: "【天魔降世】",
        type: 4,
    },
    434: {
        id: 434,
        name: "【姻缘石】",
        type: 4,
        path: '/yinYuanShi',
    },
    435: {
        id: 435,
        name: "【姻缘树】",
        type: 4,
        path: '/yinYuanShu'
    },
    436: {
        id: 436,
        name: "渡情劫",
        type: 4,
        cs: "g_sigh",
        path: '/rankTask',
        task: { id: 1, s: 0 }
    },
    437: {
        id: 437,
        name: "情劫进度",
        type: 4,
        cs: "g_sigh",
        path: '/rankTask',
        task: { id: 1, s: 1 }
    },
    438: {
        id: 438,
        name: "修炼大阵",
        type: 4,
        cs: "g_sigh",
        path: '/rankTask',
        task: { id: 2, s: 0 }
    },
    439: {
        id: 439,
        name: "修炼大阵",
        type: 4,
        cs: "g_sigh",
        path: '/rankTask',
        task: { id: 2, s: 1 }
    },
    440: {
        id: 440,
        name: "上古战场",
        type: 4,
        path: '/zhanChang',
    },
    441: {
        id: 441,
        name: "炼器炉",
        type: 4,
        path: '/equipFreeForge'
    },
    442: {
        id: 442,
        name: "南海渔村",
        type: 4,
        path: '/unknownCapability',
        state: { id: 442 }
    },
    443: {
        id: 443,
        name: "幽冥阵眼",
        type: 4,
        path: '/unknownCapability',
        state: { id: 443 }
    },
};
module.exports = {
    ELEMENT_4
}
