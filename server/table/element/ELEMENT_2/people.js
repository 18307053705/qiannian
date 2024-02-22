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
        article: '210-1-50'
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
        name: "大地魔熊",
        level: 20,
    },
    20022: {
        name: "黑白魔熊",
        level: 22,
    },
    20023: {
        name: "大泽毒蛙",
        level: 24,
        article: '211-1-100'
    },
    20024: {
        name: "大泽毒蝎",
        level: 26,
        article: '212-1-100'
    },
    20025: {
        name: "青鲤鱼",
        level: 28,
    },
    20026: {
        name: "河藤葵",
        level: 30,
    },
    20027: {
        name: "藏羚羊",
        level: 28,
        article: '213-1-50'
    },
    20028: {
        name: "巨羊角",
        level: 30,
        article: '214-1-50'
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
        name: "粉红毒蝎",
        level: 28,
    },
    20036: {
        name: "人脸魔蛛",
        level: 30,
    },
    20037: {
        name: "魔族探子",
        level: 28,
    },
    20038: {
        name: "魔化狼妖",
        level: 30,
    },
    // 藏剑冢
    20041: {
        name: "夺宝剑修",
        level: 28,
    },
    20042: {
        name: "夺宝体修",
        level: 30,
    },
    20043: {
        name: "守墓铁尸",
        level: 28,
    },
    20044: {
        name: "守墓银尸",
        level: 30,
    },
    20045: {
        name: "左剑死侍",
        level: 28,
    },
    20046: {
        name: "右剑死侍",
        level: 30,
    },
    20047: {
        name: "上古龙魂",
        level: 30,
    },
    20048: {
        name: "上古剑灵",
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
