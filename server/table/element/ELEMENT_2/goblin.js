const freakMap = {
    // 盘丝洞
    20211: {
        name: "虎妖",
        level: 1,
    },
    20212: {
        name: "狼妖",
        level: 3,
    },
    20213: {
        name: "食人花妖",
        level: 5,
    },
    20214: {
        name: "食人树妖",
        level: 5,
    },
    20215: {
        name: "黑熊精",
        level: 5,
    },
    20216: {
        name: "黑蛇精",
        level: 5,
    },
    20217: {
        name: "白骨蜘蛛",
        level: 5,
    },
    20218: {
        name: "神秘高手",
        level: 5,
    },
    // 不夜城
    20221: {
        name: "流氓",
        level: 20,
    },
    20222: {
        name: "瘪三",
        level: 22,
    },
    20223: {
        name: "亡命恶徒",
        level: 24,
    },
    20224: {
        name: "亡命狂徒",
        level: 26,
    },
    20225: {
        name: "神秘刺客",
        level: 28,
    },
    20226: {
        name: "血魔宗外门弟子",
        level: 30,
    },
    20227: {
        name: "独角狮虎",
        level: 28,
    },
    20228: {
        name: "血魔宗内门弟子",
        level: 30,
    },
    // 迷雾森林
    20231: {
        name: "光头纸人",
        level: 28,
    },
    20232: {
        name: "长发纸人",
        level: 30,
    },
    20233: {
        name: "红木古树",
        level: 28,
    },
    20234: {
        name: "盗墓贼",
        level: 30,
    },
    20235: {
        name: "古墓游尸",
        level: 28,
    },
    20236: {
        name: "五色毒蛛",
        level: 30,
    },
    20237: {
        name: "尸煞",
        level: 28,
    },
    20238: {
        name: "魔族弟子",
        level: 30,
    },
    // 妖魔岭
    20241: {
        name: "金甲魔虫",
        level: 28,
    },
    20242: {
        name: "看守弟子",
        level: 30,
    },
    20243: {
        name: "入魔修士",
        level: 28,
    },
    20244: {
        name: "红石骨魔",
        level: 30,
    },
    20245: {
        name: "红河水鬼",
        level: 28,
    },
    20246: {
        name: "紫叶花魔",
        level: 30,
    },
    20247: {
        name: "食人魔",
        level: 30,
    },
    20248: {
        name: "魔族高手",
        level: 30,
    },
}

module.exports = {
    getGoblinFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                ...JSON.parse(JSON.stringify(freakMap[freakId]))
            }
        }
        return undefined;
    }
}
