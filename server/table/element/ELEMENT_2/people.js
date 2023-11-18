const freakMap = {
    2000: {
        name: "巡逻山贼",
        level: 1,
        pet: true,
        article: '1',
        creatNum: 2,
    },
    2001: {
        name: "山贼头目",
        level: 3,
        pet: true,
        creatNum: 2,
    },
    2002: {
        name: "精英山贼",
        level: 5,
        pet: true,
        creatNum: 3
    },
    2003: {
        name: "大当家",
        level: 5,
        attr: 2,
        num: 1,
    },
    2004: {
        name: "大泽腾蛇",
        level: 20,
        article: '313-1-80',
        equip: '11-25,16-25,21-25',
        pet: true,
    },
    2005: {
        name: "金甲鳄鱼",
        level: 22,
        equip: '12-25,17-25,22-25',
        pet: true,
    },
    2006: {
        name: "黑白圣熊",
        level: 24,
        equip: '13-25,18-25,23-25',
        pet: true,
    },
    2007: {
        name: "大地圣熊",
        level: 26,
        equip: '14-25,18-25,24-25',
        pet: true,
    },
    2008: {
        name: "沼泽魔蟹",
        level: 28,
        equip: '15-25,19-25,25-25',
        pet: true,
    },
    2009: {
        name: "沼泽巨蟒",
        level: 30,
        equip: '212-20,213-20',
        pet: true,
    },
    20010: {
        name: "腐肉行尸",
        level: 40,
        attr: 5,
        pet: true,
    },
    20011: {
        name: "八眼魔蛛",
        level: 40,
        attr: 5,
        pet: true,
    },
    20012: {
        name: "蓑衣老者",
        level: 42,
        attr: 5,
        grade: 2,
    },
    20013: {
        name: "幽毒郎君",
        grade: 2,
        level: 25,
        attr: 2,
        num: 1,
    },
    20014: {
        name: "守崖人",
        level: 50,
        attr: 5,
        grade: 2,
    },
    20015: {
        name: "魔化大当家",
        grade: 2,
        type: 2,
        level: 5,
        attr: 1.5,
        num: 1,
    },
    20016: {
        name: "毒蝎",
        level: 40,
        attr: 5,
        pet: true,
    },
    20017: {
        name: "毒蛇",
        level: 40,
        attr: 5,
        pet: true,
    },
    20018: {
        name: "蚩梦",
        level: 40,
        attr: 5,
    },
}

module.exports = {
    getPeopleFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                ...JSON.parse(JSON.stringify(freakMap[freakId]))
            }
        }
        return undefined;
    }
}