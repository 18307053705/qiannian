const freakMap = {
    // 30级炼魂洞
    2050: {
        name: "白魂郎君",
        level: 25,
        noBoss: 1
    },
    2051: {
        name: "绿魂郎君",
        level: 25,
        noBoss: 1
    },
    2052: {
        name: "蓝魂郎君",
        level: 25,
        noBoss: 1
    },
    2053: {
        name: "青魂郎君",
        level: 25,
        noBoss: 1
    },
    2054: {
        name: "金魂郎君",
        level: 25,
        noBoss: 1
    },
    2055: {
        name: "红魂郎君",
        level: 25,
        noBoss: 1
    },
    2056: {
        name: "紫魂郎君",
        level: 30,
        noBoss: 1,
    },
    2057: {
        name: "炼魂郎君",
        level: 32,
        noBoss: 1,
        attr: 3
    },
    2058: {
        name: "幽冥凶魂",
        level: 25,
        exp: 100,
        tael: 20,
    },
    2059: {
        name: "幽冥怨魂",
        level: 25,
        exp: 100,
        tael: 20,
    },
    // 40级黑魔宗
    20510: {
        name: "白袍护法",
        level: 35,
        noBoss: 2,
    },
    20511: {
        name: "青袍护法",
        level: 35,
        noBoss: 2,
    },
    20512: {
        name: "橙袍护法",
        level: 35,
        noBoss: 2,
    },
    20513: {
        name: "红袍护法",
        level: 35,
        noBoss: 2,
    },
    20514: {
        name: "紫袍护法",
        level: 35,
        noBoss: 2,
    },
    20515: {
        name: "二长老",
        level: 40,
        noBoss: 2
    },
    20516: {
        name: "大长老",
        level: 40,
        noBoss: 2,
    },
    20517: {
        name: "黑魔宗主",
        level: 42,
        noBoss: 2,
        attr: 3
    },
    20518: {
        name: "黑魔宗弟子",
        level: 35,
        exp: 200,
        tael: 50,
    },
    20519: {
        name: "黑魔魔弟子",
        level: 35,
        exp: 200,
        tael: 50,
    },
    // 50级四海龙宫
    20520: {
        name: "龙宫太子",
        level: 45,
        noBoss: 3,
    },
    20521: {
        name: "龟丞相",
        level: 45,
        noBoss: 3,
    },
    20522: {
        name: "南海龙王",
        level: 48,
        noBoss: 3,
    },
    20523: {
        name: "北海龙王",
        level: 48,
        noBoss: 3,
    },
    20524: {
        name: "西海龙王",
        level: 48,
        noBoss: 3,
    },
    20525: {
        name: "东海龙王",
        level: 48,
        noBoss: 3,
    },
    20526: {
        name: "五爪金龙",
        level: 50,
        noBoss: 3,
    },
    20527: {
        name: "镇海神龙",
        level: 55,
        noBoss: 3,
        attr: 3
    },
    20528: {
        name: "巡海夜叉",
        level: 45,
        exp: 300,
        tael: 70,
    },
    20529: {
        name: "千年海妖",
        level: 45,
        exp: 300,
        tael: 70,
    },
    // 60级凤凰桐木
    20520: {
        name: "道观图腾",
        level: 60,
        noBoss: 4,
    },
    20521: {
        name: "道观童子",
        level: 60,
        noBoss: 4,
    },
    20522: {
        name: "紫霞魔蛛",
        level: 62,
        noBoss: 4,
    },
    20523: {
        name: "青天魔牛",
        level: 62,
        noBoss: 4,
    },
    20524: {
        name: "火云真人",
        level: 62,
        noBoss: 4,
    },
    20525: {
        name: "凤凰真身",
        level: 62,
        noBoss: 4,
    },
    20526: {
        name: "万年桐木",
        level: 65,
        noBoss: 4,
        attr: 5
    },
    20527: {
        name: "上古凤凰",
        level: 65,
        noBoss: 4,
        attr: 5.5
    },
    20528: {
        name: "火焰狼",
        level: 60,
        exp: 500,
        tael: 100,
    },
    20529: {
        name: "火焰虎",
        level: 60,
        exp: 500,
        tael: 100,
    },
    // 70级魔神传说
    20530: {
        name: "精英弟子",
        level: 70,
        noBoss: 5,
    },
    20531: {
        name: "亲传弟子",
        level: 70,
        noBoss: 5,
    },
    20532: {
        name: "护宗魔兽",
        level: 72,
        noBoss: 5,
    },
    20533: {
        name: "左护法",
        level: 72,
        noBoss: 5,
    },
    20534: {
        name: "右护法",
        level: 72,
        noBoss: 5,
    },
    20535: {
        name: "血魔宗主",
        level: 72,
        noBoss: 5,
    },
    20536: {
        name: "血魔老祖",
        level: 75,
        noBoss: 5,
        attr: 5
    },
    20537: {
        name: "血魔真身",
        level: 75,
        noBoss: 5,
        attr: 5.5
    },
    20538: {
        name: "魔宗弟子",
        level: 70,
        exp: 700,
        tael: 150,
    },
    20539: {
        name: "魔宗弟子",
        level: 70,
        exp: 700,
        tael: 150,
    },
    // 80级海底魔宫
    20530: {
        name: "凡阶傀儡",
        level: 80,
        noBoss: 6,
    },
    20531: {
        name: "黄阶傀儡",
        level: 80,
        noBoss: 6,
    },
    20532: {
        name: "玄阶傀儡",
        level: 80,
        noBoss: 6,
    },
    20533: {
        name: "地阶傀儡",
        level: 80,
        noBoss: 6,
    },
    20534: {
        name: "天阶傀儡",
        level: 80,
        noBoss: 6,
    },
    20535: {
        name: "守殿人",
        level: 82,
        noBoss: 6,
    },
    20536: {
        name: "海魔",
        level: 82,
        noBoss: 6,
        attr: 6
    },
    20537: {
        name: "魔尊残影",
        level: 85,
        noBoss: 6,
        attr: 7
    },
    20538: {
        name: "入魔虾兵",
        level: 80,
        exp: 1000,
        tael: 200,
    },
    20539: {
        name: "入魔蟹将",
        level: 80,
        exp: 1000,
        tael: 200,
    },
    // 90级魔尊遗迹
    20530: {
        name: "天枢阵",
        level: 90,
        noBoss: 7,
    },
    20531: {
        name: "天璇阵",
        level: 90,
        noBoss: 7,
    },
    20532: {
        name: "天机阵",
        level: 90,
        noBoss: 7,
    },
    20533: {
        name: "天权阵",
        level: 90,
        noBoss: 7,
    },
    20534: {
        name: "玉衡阵",
        level: 90,
        noBoss: 7,
    },
    20535: {
        name: "开阳阵",
        level: 92,
        noBoss: 7,
    },
    20536: {
        name: "瑶光阵",
        level: 92,
        noBoss: 7,
        attr: 7
    },
    20537: {
        name: "魔尊化身",
        level: 95,
        noBoss: 7,
        attr: 10
    },
    20538: {
        name: "魔尊信徒",
        level: 90,
        exp: 1500,
        tael: 300,
    },
    20539: {
        name: "魔尊信徒",
        level: 90,
        exp: 1500,
        tael: 300,
    },
    // 100级地府传说
    20540: {
        name: "牛头",
        level: 100,
        noBoss: 8,
    },
    20541: {
        name: "马面",
        level: 100,
        noBoss: 8,
    },
    20542: {
        name: "白无常",
        level: 100,
        noBoss: 8,
    },
    20543: {
        name: "黑无常",
        level: 100,
        noBoss: 8,
    },
    20544: {
        name: "地府判官",
        level: 100,
        noBoss: 8,
    },
    20545: {
        name: "孟婆",
        level: 110,
        noBoss: 8,
        attr: 10,
        grade: 3,
    },
    20546: {
        name: "地藏菩萨",
        level: 110,
        noBoss: 8,
        attr: 10,
        grade: 3,
    },
    20547: {
        name: "酆都大帝",
        level: 120,
        noBoss: 8,
        attr: 12,
        grade: 3,
    },
    20548: {
        name: "地府小鬼",
        level: 100,
        exp: 2000,
        tael: 500,
    },
    20549: {
        name: "地府小鬼",
        level: 100,
        exp: 2000,
        tael: 500,
    },
    // 100级群魔乱舞
    20550: {
        name: "影魔",
        level: 100,
        noBoss: 8,
    },
    20551: {
        name: "魅魔",
        level: 100,
        noBoss: 8,
    },
    20552: {
        name: "琴魔",
        level: 100,
        noBoss: 8,
    },
    20553: {
        name: "血魔",
        level: 100,
        noBoss: 8,
    },
    20554: {
        name: "海魔石像",
        level: 100,
        noBoss: 8,
    },
    20555: {
        name: "地魔石像",
        level: 102,
        noBoss: 8,
        attr: 10
    },
    20556: {
        name: "天魔石像",
        level: 102,
        noBoss: 8,
        attr: 10
    },
    20557: {
        name: "魔尊石像",
        level: 105,
        noBoss: 8,
        attr: 10,
        grade: 3,
    },
    20558: {
        name: "魔族精英",
        level: 100,
        exp: 2000,
        tael: 500,
    },
    20559: {
        name: "魔族精英",
        level: 100,
        exp: 2000,
        tael: 500,
    },
}


module.exports = {
    getCopyFreak: function (freakId) {
        if (freakMap[freakId]) {
            const base = {
                id: freakId,
                grade: 2,
                attrType: 1,
                num: 1,
                attr: 2,
                expField: true,
                taelField: true,
            }
            const { level, noBoss, ...freak } = JSON.parse(JSON.stringify(freakMap[freakId]));
            if (!noBoss) {
                delete base.expField;
                delete base.taelField;
            }
            if (noBoss === 1) {
                base.exp = 24000;
                base.tael = 5000;
            }
            if (noBoss === 2) {
                base.exp = 50000;
                base.tael = 10000;
            }
            if (noBoss === 3) {
                base.exp = 150000;
                base.tael = 20000;
            }
            if (noBoss === 4) {
                base.exp = 1000000;
                base.tael = 30000;
                base.attr = 3;
            }
            if (noBoss === 5) {
                base.exp = 3000000;
                base.tael = 50000;
                base.attr = 5;
            }
            if (noBoss === 6) {
                base.exp = 5000000;
                base.tael = 100000;
                base.attr = 6;
            }
            if (noBoss === 7) {
                base.exp = 7000000;
                base.tael = 300000;
                base.attr = 7;
            }
            if (noBoss === 8) {
                base.exp = 10000000;
                base.tael = 500000;
                base.attr = 9;
            }
            return {
                ...base,
                ...freak,
                level
            }
        }
        return undefined;
    }
}
