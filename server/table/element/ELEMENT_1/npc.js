const NpcMap = {
    100: {
        name: "灰色古籍",
    },
    101: {
        name: "胡晶丽",
    },
    102: {
        name: "百晓生",
    },
    103: {
        name: "天机老人",
    },
    104: {
        name: "欧冶子",
    },
    105: {
        name: "拎壶冲",
    },
    106: {
        name: "小红",
    },
    107: {
        name: "金宝箱",
        jyd: 10
    },
    108: {
        name: "银宝箱",
        jyd: 5
    },
    109: {
        name: "铜宝箱",
        jyd: 1
    },
    1010: {
        name: "鬼医",
    },
    1011: {
        name: "幻境世界",
    },
    1012: {
        name: "赶尸人",
    },
    // 1010: {
    //     name: "灰色古籍",
    // },
    // 1011: {
    //     name: "小红",
    // },
    // 1012: {
    //     name: "神秘小女孩",
    // },
    // 1013: {
    //     name: "女娃",
    // },

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



