const freakMap = {
    2040: {
        name: "孤魂",
        level: 10,
    },
    2041: {
        name: "野鬼",
        level: 10,
    },
    2042: {
        name: "皮皮猴",
        level: 12,
    },
    2043: {
        name: "树妖",
        level: 12,
    },
    2044: {
        name: "赤炎蜘蛛",
        level: 15,
    },
    2045: {
        name: "灵异小妖",
        level: 15,
    },
    2047: {
        name: "骷髅剑客",
        level: 32,
        attr: 2,
    },
    2048: {
        name: "八爪章鱼",
        level: 32,
        attr: 2,
    },
    2049: {
        name: "骷髅骑士",
        level: 35,
        attr: 3,
    },
    20410: {
        name: "九头大蛇",
        level: 35,
        attr: 3,
    },
    20411: {
        name: "骷髅护卫",
        level: 38,
        attr: 3,
    },
    20412: {
        name: "龙鹰剑士",
        level: 38,
        attr: 3,
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
    20421: {
        name: "火蟒虎",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20422: {
        name: "冰晶狼",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20423: {
        name: "上古巨蟒",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20424: {
        name: "五色巨蟒",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20425: {
        name: "上古泰坦",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20426: {
        name: "上古神猿",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20427: {
        name: "万年孤魂",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20428: {
        name: "万年野鬼",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20429: {
        name: "彼岸花妖",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20430: {
        name: "彼岸花灵",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20431: {
        name: "万年情执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20432: {
        name: "万年恨执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20433: {
        name: "过去因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20434: {
        name: "未来因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20435: {
        name: "恶念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20436: {
        name: "善念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20437: {
        name: "孟婆化身",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20438: {
        name: "魂河古龙",
        level: 120,
        grade: 2,
        attr: 10,
    },
}
module.exports = {
    getNeutralityFreak: function (freakId) {
        const freak = freakMap[freakId];
        if (!freak) {
            console.log('异常怪物ID：', freakId);
            return undefined;
        }
        // 是否可捕捉
        if (freak.level < 45 && !freak.grade && freak.pet === undefined) {
            freak.pet = true;
        }
        return {
            id: freakId,
            ...JSON.parse(JSON.stringify(freak))
        }
    }
}
