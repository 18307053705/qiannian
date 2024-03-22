const freakMap = {
    // 云荒大陆
    20411: {
        name: "孤魂",
        level: 10,
        article: '136-1-10'
    },
    20412: {
        name: "野鬼",
        level: 10,
        article: '137-1-10'
    },
    20413: {
        name: "树妖",
        level: 10,
        article: '138-1-10'
    },
    20414: {
        name: "桑树",
        level: 10,
        article: '139-1-10,2113-1-70'
    },
    20415: {
        name: "大耳猴",
        level: 10,
        article: '1310-1-10'
    },
    20416: {
        name: "皮皮猴",
        level: 10,
        article: '190-1-25'
    },
    20417: {
        name: "赤炎蜘蛛",
        level: 10,
        article: '193-1-25,196-1-25'
    },
    20418: {
        name: "灵异小妖",
        level: 10,
        article: '199-1-25,1912-1-25'
    },
    // 无妄海
    20421: {
        name: "骷髅剑客",
        level: 28,
        attr: 2,
        article: '1311-10,1316-10,1321-10'
    },
    20422: {
        name: "骷髅刀客",
        level: 30,
        attr: 2,
        article: '1311-10,1316-10,1321-10'
    },
    20423: {
        name: "神秘触手",
        level: 32,
        attr: 2,
        article: '1312-10,1317-10,1322-10'
    },
    20424: {
        name: "八爪章鱼",
        level: 34,
        attr: 3,
        article: '1312-10,1317-10,1322-10'
    },
    20425: {
        name: "海底亡魂",
        level: 36,
        attr: 2,
        article: '1313-10,1318-10,1323-10'
    },
    20426: {
        name: "海底冤魂",
        level: 38,
        attr: 3,
        article: '1313-10,1318-10,1323-10'
    },
    20427: {
        name: "骷髅骑士",
        level: 39,
        attr: 2,
        article: '1314-10,1319-10,1324-10'
    },
    20428: {
        name: "骷髅护卫",
        level: 40,
        attr: 3,
        article: '1315-10,1320-10,1325-10'
    },
    // 南海琉璃宫
    20431: {
        name: "虾兵",
        level: 50,
        grade: 2,
        attr: 10,
        article: '191-1-30'
    },
    20432: {
        name: "蟹将",
        level: 50,
        grade: 2,
        attr: 10,
        article: '194-1-25'
    },
    20433: {
        name: "紫草冰精",
        level: 50,
        grade: 2,
        attr: 10,
        article: '197-1-25'
    },
    20434: {
        name: "雷电神马",
        level: 50,
        grade: 2,
        attr: 10,
        article: '1910-1-25'
    },
    20435: {
        name: "深海巨鲸",
        level: 50,
        grade: 2,
        attr: 10,
        article: '1913-1-25'
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
        level: 130,
        grade: 2,
        attr: 10,
        article: '192-1-25'
    },
    20452: {
        name: "黄泉野鬼",
        level: 130,
        grade: 2,
        attr: 10,
        article: '192-1-25'
    },
    20453: {
        name: "彼岸花妖",
        level: 132,
        grade: 2,
        attr: 10,
        article: '195-1-25'
    },
    20454: {
        name: "彼岸花灵",
        level: 134,
        grade: 2,
        attr: 10,
        article: '195-1-25'
    },
    20455: {
        name: "忘川情执",
        level: 136,
        grade: 2,
        attr: 10,
        article: '198-1-25'
    },
    20456: {
        name: "忘川恨执",
        level: 138,
        grade: 2,
        attr: 10,
        article: '198-1-25'
    },
    20457: {
        name: "过去因果",
        level: 140,
        grade: 2,
        attr: 10,
        article: '1911-1-25'
    },
    20458: {
        name: "未来因果",
        level: 142,
        grade: 2,
        attr: 10,
        article: '1911-1-25'
    },
    20459: {
        name: "一念之恶",
        level: 144,
        grade: 2,
        attr: 10,
        article: '1914-1-25'
    },
    204510: {
        name: "一念之善",
        level: 146,
        grade: 2,
        attr: 10,
        article: '1914-1-25'
    },
    204511: {
        name: "孟婆化身",
        level: 148,
        grade: 2,
        attr: 10,
    },
    204512: {
        name: "魂河冥龙",
        level: 150,
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
