const NpcMap = {
    110: {
        name: "炼魂郎君",
        level: 62,
    },
    111: {
        name: "御龙大将军",
        level: 62,
    },
    112: {
        name: "守崖人",
        level: 62,
    },
    113: {
        name: "妖族探子",
        level: 62,
    },
    124: {
        name: "仙族探子",
        level: 62,
    },
    125: {
        name: "人族探子",
        level: 62,
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
