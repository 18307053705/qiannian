const freakMap = {
    2010: {
        name: "小鲤鱼",
        level: 1,
    },
    2011: {
        name: "九莲荷叶",
        level: 3,
    },
    2012: {
        name: "捣蛋仙童",
        level: 5,
    },
    2013: {
        name: "贪睡女仙",
        level: 5,
    },
    2014: {
        name: "扶桑古树",
        level: 5,
    },
    2015: {
        name: "九足金乌",
        level: 5,
    },
    2016: {
        name: "月宫仙子",
        level: 5,
    },
    2017: {
        name: "月桂古树",
        level: 5,
    },
    2018: {
        name: "镇守天兵",
        level: 20,
    },
    2019: {
        name: "镇守天将",
        level: 22,
    },
    20110: {
        name: "喜神化身",
        level: 24,
    },
    20111: {
        name: "怒神化身",
        level: 26,
    },
    20112: {
        name: "一堆元宝",
        level: 28,
    },
    20113: {
        name: "九转金丹",
        level: 30,
    },
    20114: {
        name: "九天神将",
        level: 28,
    },
    20115: {
        name: "心魔化身",
        level: 30,
    },
    20116: {
        name: "离魂阵灵",
        level: 28,
    },
    20117: {
        name: "驱魂阵灵",
        level: 30,
    },
    20118: {
        name: "真龙骸骨",
        level: 28,
    },
    20119: {
        name: "真龙残魂",
        level: 30,
    },
    20120: {
        name: "堕落天仙",
        level: 28,
    },
    20122: {
        name: "堕落玄仙",
        level: 30,
    },
    20123: {
        name: "真仙傀儡",
        level: 28,
    },
    20124: {
        name: "天魔意志",
        level: 30,
    },
    20125: {
        name: "金甲力士",
        level: 28,
    },
    20126: {
        name: "金甲卫士",
        level: 30,
    },
    20127: {
        name: "镇殿盘龙柱",
        level: 28,
    },
    20128: {
        name: "镇殿翥凤碑",
        level: 30,
    },
    20129: {
        name: "绝世剑意",
        level: 28,
    },
    20130: {
        name: "真武伏魔剑",
        level: 30,
    },
    20131: {
        name: "武道化身",
        level: 30,
    },
    20132: {
        name: "真武大帝",
        level: 30,
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
