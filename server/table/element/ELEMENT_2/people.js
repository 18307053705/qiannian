const freakMap = {
    // 黑风寨 2001 - 编号
    20011: {
        name: "巡逻山贼",
        level: 1,
        attr: 0.1
    },
    20012: {
        name: "持刀山贼",
        level: 3,
    },
    20013: {
        name: "持斧山贼",
        level: 5,
    },
    20014: {
        name: "精英山贼",
        level: 5,
    },
    20015: {
        name: "二当家",
        level: 5,
    },
    20016: {
        name: "大当家",
        level: 5,
    },
    20017: {
        name: "四眼鹰",
        level: 5,
    },
    20018: {
        name: "斑斓蛇",
        level: 5,
        article: '210-1-70'
    },
    20019: {
        name: "溪中青鱼",
        level: 30,
    },
    200110: {
        name: "溪中红鱼",
        level: 30,
    },
    200111: {
        name: "鬼祟修士",
        level: 30,
    },
    200112: {
        name: "修士队长",
        level: 30,
    },
    // 大泽谷
    20021: {
        name: "大泽毒蚊",
        level: 20,
    },
    20022: {
        name: "大泽毒蛇",
        level: 22,
    },
    20023: {
        name: "大泽毒蛙",
        level: 24,
        article: '211-1-70'
    },
    20024: {
        name: "大泽毒蝎",
        level: 26,
    },
    20025: {
        name: "大地魔熊",
        level: 28,
    },
    20026: {
        name: "大泽妖狼",
        level: 30,
        article: '212-1-70'
    },
    20027: {
        name: "大泽树妖",
        level: 28,
    },
    20028: {
        name: "大泽巨蟒",
        level: 30,
        article: '213-1-70'
    },
    // 映月崖
    20031: {
        name: "干枯行尸",
        level: 28,
    },
    20032: {
        name: "腐肉秃鹫",
        level: 30,
    },
    20033: {
        name: "迷失剑客",
        level: 28,
    },
    20034: {
        name: "迷失刀客",
        level: 30,
    },
    20035: {
        name: "幽光月狼",
        level: 28,
        article: '214-1-70'
    },
    20036: {
        name: "幽冰魔狼",
        level: 30,
        article: '215-1-70'
    },
    20037: {
        name: "魔化妖虎",
        level: 28,
    },
    20038: {
        name: "魔化妖狼",
        level: 30,
    },
    // 藏剑冢
    20041: {
        name: "盗墓贼",
        level: 28,
    },
    20042: {
        name: "破阵魔修",
        level: 30,
    },
    20043: {
        name: "守墓铁甲",
        level: 28,
    },
    20044: {
        name: "守墓银甲",
        level: 30,
    },
    20045: {
        name: "吸血冥蝠",
        level: 28,
    },
    20046: {
        name: "镇墓剑侍",
        level: 30,
    },
    20047: {
        name: "魔修傀儡",
        level: 30,
    },
    20048: {
        name: "剑魔分身",
        level: 30,
    },
}

module.exports = {
    getPeopleFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                ...JSON.parse(JSON.stringify(freakMap[freakId])),
                pet: true
            }
        }
        return undefined;
    }
}
