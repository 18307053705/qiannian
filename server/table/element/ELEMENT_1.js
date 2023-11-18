const NpcMap = {
    10: {
        name: "拎壶冲",
    },
    11: {
        name: "胡晶丽",
    },
    12: {
        name: "太白金星",
    },
    13: {
        name: "送财童子",
        cs: "g_b_u",
        path: '/jackpotInvest'
    },
    14: {
        name: "天机老人",
    },
    15: {
        name: "白胡子老人",
    },
    16: {
        name: "欧冶子",
        path: '/equipFreeForge'
    },
    17: {
        name: "百晓生",
    },
    18: {
        name: "金宝箱",
        jyd: 10
    },
    19: {
        name: "银宝箱",
        jyd: 5
    },
    110: {
        name: "铜宝箱",
        jyd: 1
    },
    111: {
        name: "唐三彩",
    },
    112: {
        name: "小红",
    },
    113: {
        name: "神秘小女孩",
    },
    114: {
        name: "女娃",
    },
    115: {
        name: "洞府之灵",
    },
    116: {
        name: "炼魂郎君",
    },
    117: {
        name: "御龙大将军",
    },
    118: {
        name: "守崖人",
    },
    119: {
        name: "妖族探子",
    },
    120: {
        name: "仙族探子"
    },
    121: {
        name: "人族探子",
    },
};

module.exports = {
    getNpc: function (npcId) {
        if (!NpcMap[npcId]) {
            console.log('未找到对应NPC:::', npcId);
            return undefined;
        }
        return JSON.parse(JSON.stringify({
            type: 1,
            id: npcId,
            ...NpcMap[npcId],
        }))

    }
}