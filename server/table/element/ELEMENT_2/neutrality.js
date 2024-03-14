const freakMap = {
    // 云荒大陆
    20411: {
        name: "孤魂",
        level: 10,
    },
    20412: {
        name: "野鬼",
        level: 10,
    },
    20413: {
        name: "树妖",
        level: 10,
    },
    20414: {
        name: "桑树",
        level: 10,
        article: '2113-1-70'
    },
    20415: {
        name: "大耳猴",
        level: 10,
    },
    20416: {
        name: "皮皮猴",
        level: 10,
    },
    20417: {
        name: "赤炎蜘蛛",
        level: 10,
    },
    20418: {
        name: "灵异小妖",
        level: 10,
    },
    // 无妄海
    20421: {
        name: "骷髅剑客",
        level: 32,
        attr: 2,
    },
    20422: {
        name: "骷髅刀客",
        level: 32,
        attr: 2,
    },
    20423: {
        name: "神秘触手",
        level: 32,
        attr: 2,
    },
    20424: {
        name: "八爪章鱼",
        level: 35,
        attr: 3,
    },
    20425: {
        name: "海底亡魂",
        level: 32,
        attr: 2,
    },
    20426: {
        name: "海底冤魂",
        level: 35,
        attr: 3,
    },
    20427: {
        name: "骷髅骑士",
        level: 32,
        attr: 2,
    },
    20428: {
        name: "骷髅护卫",
        level: 35,
        attr: 3,
    },
    // 南海琉璃宫
    20431: {
        name: "虾兵",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20432: {
        name: "蟹将",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20433: {
        name: "紫草冰精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20434: {
        name: "雷电神马",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20435: {
        name: "深海巨鲸",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20436: {
        name: "深海白鲨",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20437: {
        name: "深海蚌精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20438: {
        name: "深海螺精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    // 十万大山
    20441: {
        name: "千眼魔蛛",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20442: {
        name: "万足蜈蚣",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20443: {
        name: "千臂魔猿",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20444: {
        name: "泰坦魔猿",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20445: {
        name: "万年蛟龙",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20446: {
        name: "化龙天劫",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20447: {
        name: "九色神鹿",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20448: {
        name: "烛龙气息",
        level: 80,
        grade: 2,
        attr: 10,
    },
    // 幽冥地府
    20451: {
        name: "黄泉孤魂",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20452: {
        name: "黄泉野鬼",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20453: {
        name: "彼岸花妖",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20454: {
        name: "彼岸花灵",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20455: {
        name: "情执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20456: {
        name: "恨执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20457: {
        name: "过去因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20458: {
        name: "未来因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20459: {
        name: "恶念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    204510: {
        name: "善念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    204511: {
        name: "孟婆化身",
        level: 120,
        grade: 2,
        attr: 10,
    },
    204512: {
        name: "魂河冥龙",
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
