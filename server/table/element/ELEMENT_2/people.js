const freakMap = {
    2000: {
        name: "持刀山贼",
        level: 1,
    },
    2001: {
        name: "持斧山贼",
        level: 3,
    },
    2002: {
        name: "巡逻山贼",
        level: 5,
    },
    2003: {
        name: "精英山贼",
        level: 5,
    },
    2004: {
        name: "二当家",
        level: 5,
    },
    2005: {
        name: "大当家",
        level: 5,
    },
    2006: {
        name: "四眼鹰",
        level: 5,
    },
    2007: {
        name: "斑斓蛇",
        level: 5,
    },
    2008: {
        name: "大泽毒蟾",
        level: 20,
    },
    2009: {
        name: "大泽毒蛙",
        level: 22,
    },
    20010: {
        name: "黑白圣熊",
        level: 24,
    },
    20011: {
        name: "大地魔熊",
        level: 26,
    },
    20012: {
        name: "血色蚁蚊",
        level: 28,
    },
    20013: {
        name: "血色迷蜂",
        level: 30,
    },
    20014: {
        name: "长嘴巨鳄",
        level: 28,
    },
    20015: {
        name: "血眼大蟒",
        level: 30,
    },
    20016: {
        name: "干枯行尸",
        level: 28,
    },
    20017: {
        name: "腐肉秃鹫",
        level: 30,
    },
    20018: {
        name: "迷失剑客",
        level: 28,
    },
    20019: {
        name: "迷失刀客",
        level: 30,
    },
    20020: {
        name: "粉红毒蝎",
        level: 28,
    },
    20022: {
        name: "人脸魔蛛",
        level: 30,
    },
    20023: {
        name: "魔族探子",
        level: 28,
    },
    20024: {
        name: "魔化狼妖",
        level: 30,
    },
    20025: {
        name: "夺宝剑修",
        level: 28,
    },
    20026: {
        name: "夺宝体修",
        level: 30,
    },
    20027: {
        name: "守墓铁尸",
        level: 28,
    },
    20028: {
        name: "守墓银尸",
        level: 30,
    },
    20029: {
        name: "左剑死侍",
        level: 28,
    },
    20030: {
        name: "右剑死侍",
        level: 30,
    },
    20031: {
        name: "上古龙魂",
        level: 30,
    },
    20032: {
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
