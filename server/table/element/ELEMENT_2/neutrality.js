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
        level: 12,
    },
    20414: {
        name: "桑树",
        level: 12,
        article: '215-1-50'
    },
    20415: {
        name: "大耳猴",
        level: 12,
    },
    20416: {
        name: "皮皮猴",
        level: 12,
    },
    20417: {
        name: "赤炎蜘蛛",
        level: 15,
        article: '216-1-50'
    },
    20418: {
        name: "灵异小妖",
        level: 15,
        article: '217-1-50'
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
        name: "深海巨鲸",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20421: {
        name: "深海白鲨",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20422: {
        name: "深海蚌精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    20423: {
        name: "深海螺精",
        level: 50,
        grade: 2,
        attr: 10,
    },
    // 十万大山
    20424: {
        name: "千眼魔蛛",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20425: {
        name: "万足蜈蚣",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20426: {
        name: "千臂魔猿",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20427: {
        name: "泰坦魔猿",
        level: 70,
        grade: 2,
        attr: 10,
    },
    20428: {
        name: "万年蛟龙",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20429: {
        name: "化龙天劫",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20430: {
        name: "九色神鹿",
        level: 80,
        grade: 2,
        attr: 10,
    },
    20431: {
        name: "烛龙气息",
        level: 80,
        grade: 2,
        attr: 10,
    },
    // 幽冥地府
    20432: {
        name: "黄泉孤魂",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20433: {
        name: "黄泉野鬼",
        level: 90,
        grade: 2,
        attr: 10,
    },
    20434: {
        name: "彼岸花妖",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20435: {
        name: "彼岸花灵",
        level: 100,
        grade: 2,
        attr: 10,
    },
    20436: {
        name: "情执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20437: {
        name: "恨执",
        level: 110,
        grade: 2,
        attr: 10,
    },
    20438: {
        name: "过去因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20439: {
        name: "未来因果",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20440: {
        name: "恶念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20441: {
        name: "善念",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20442: {
        name: "孟婆化身",
        level: 120,
        grade: 2,
        attr: 10,
    },
    20443: {
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
