const NpcMap = {
    110: {
        name: "剑魔",
        level: 50,
    },
    111: {
        name: "千年巨蟒妖",
        level: 50,
    },
    112: {
        name: "白魂郎君",
        level: 30,
    },
    113: {
        name: "绿魂郎君",
        level: 30,
    },
    114: {
        name: "蓝魂郎君",
        level: 30,
    },
    115: {
        name: "青魂郎君",
        level: 30,
    },
    116: {
        name: "金魂郎君",
        level: 30,
    },
    117: {
        name: "魔化炼魂郎君",
        level: 35,
    },
};

module.exports = {
    getNpc: function (npcId) {
        if (!NpcMap[npcId]) {
            console.log('未找到对应NPC:::', npcId);
            return undefined;
        }
        return JSON.parse(JSON.stringify({
            id: npcId,
            type: 1,
            attr:1,
            num: 1,
            ...NpcMap[npcId],
            

        }))

    }
}
