const freakMap = {
    // 蓬莱仙岛
    20111: {
        name: "小鲤鱼",
        level: 100,
    },
    20112: {
        name: "九莲荷叶",
        level: 100,
    },
    20113: {
        name: "捣蛋仙童",
        level: 100,
    },
    20114: {
        name: "贪睡女仙",
        level: 100,
    },
    20115: {
        name: "扶桑古树",
        level: 100,
    },
    20116: {
        name: "九足金乌",
        level: 100,
    },
    20117: {
        name: "月宫仙子",
        level: 100,
    },
    20118: {
        name: "月桂古树",
        level: 100,
    },
    // 九天虚无岛
    20121: {
        name: "镇守天兵",
        level: 100,
    },
    20122: {
        name: "镇守天将",
        level: 100,
    },
    20123: {
        name: "喜神化身",
        level: 100,
    },
    20124: {
        name: "怒神化身",
        level: 100,
    },
    20125: {
        name: "一堆元宝",
        level: 100,
    },
    20126: {
        name: "九转金丹",
        level: 100,
    },
    20127: {
        name: "九天神将",
        level: 100,
    },
    20128: {
        name: "心魔化身",
        level: 100,
    },
    // 堕仙涧
    20131: {
        name: "离魂阵灵",
        level: 100,
    },
    20132: {
        name: "驱魂阵灵",
        level: 100,
    },
    20133: {
        name: "真龙骸骨",
        level: 100,
    },
    20134: {
        name: "真龙残魂",
        level: 100,
    },
    20135: {
        name: "堕落天仙",
        level: 100,
    },
    20136: {
        name: "堕落玄仙",
        level: 100,
    },
    20137: {
        name: "真仙傀儡",
        level: 100,
    },
    20138: {
        name: "天魔意志",
        level: 100,
    },
    // 云顶天宫
    20141: {
        name: "金甲力士",
        level: 100,
    },
    20142: {
        name: "金甲卫士",
        level: 100,
    },
    20143: {
        name: "镇殿盘龙柱",
        level: 100,
    },
    20144: {
        name: "镇殿翥凤碑",
        level: 100,
    },
    20145: {
        name: "绝世剑意",
        level: 100,
    },
    20146: {
        name: "真武伏魔剑",
        level: 100,
    },
    20147: {
        name: "武道化身",
        level: 150,
    },
    20148: {
        name: "真武大帝",
        level: 180,
    },
}

module.exports = {
    getImmortalFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                ...JSON.parse(JSON.stringify(freakMap[freakId]))
            }
        }
        return undefined;
    }
}
