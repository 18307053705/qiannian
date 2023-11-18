const freakMap = {
    2040: {
        name: "孤魂",
        level: 10,
        equip: '6-75',
        pet: true,
    },
    2041: {
        name: "野鬼",
        level: 10,
        equip: '7-50',
        pet: true,
    },
    2042: {
        name: "皮皮猴",
        level: 10,
        equip: '8-50',
        pet: true,
    },
    2043: {
        name: "树妖",
        level: 10,
        equip: '9-50',
        pet: true,
    },
    2044: {
        name: "赤炎蜘蛛",
        level: 15,
        article: '314-1-70',
        equip: '10-50',
        pet: true,
    },
    2045: {
        name: "灵异小妖",
        level: 15,
        article: '312-1-80',
        equip: '214-50,215-50',
        pet: true,
    },
    2047: {
        name: "骷髅剑客",
        level: 32,
        attr: 2,
        pet: true,
    },
    2048: {
        name: "八爪章鱼",
        level: 32,
        attr: 2,
        pet: true,
    },
    2049: {
        name: "骷髅骑士",
        level: 35,
        attr: 3,
        pet: true,
    },
    20410: {
        name: "九头大蛇",
        level: 35,
        attr: 3,
        pet: true,
    },
    20411: {
        name: "骷髅护卫",
        level: 38,
        attr: 3,
        pet: true,
    },
    20412: {
        name: "龙鹰剑士",
        level: 38,
        attr: 3,
        pet: true,
    },
    20413: {
        name: "御龙大将军",
        level: 40,
        grade: 2,
        attr: 4,
    },
    20414: {
        name: "蚌精",
        level: 50,
        attr: 10,
        grade: 2,
    },
    20415: {
        name: "老龟",
        level: 50,
        attr: 10,
        grade: 2,
    },
    20416: {
        name: "虾兵",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20417: {
        name: "蟹将",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20418: {
        name: "紫草冰精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20419: {
        name: "雷电神马",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20420: {
        name: "千年蛟龙",
        level: 50,
        grade: 2,
        attr: 10,
    },
}
module.exports = {
    getNeutralityFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                ...JSON.parse(JSON.stringify(freakMap[freakId]))
            }
        }
        return undefined;
    }
}