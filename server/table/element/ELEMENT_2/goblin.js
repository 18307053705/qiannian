const freakMap = {
    2020: {
        name: "虎妖",
        level: 1,
    },
    2021: {
        name: "狼妖",
        level: 3,
    },
    2022: {
        name: "食人花妖",
        level: 5,
    },
    2023: {
        name: "食人树妖",
        level: 5,
    },
    2024: {
        name: "黑熊精",
        level: 5,
    },
    2025: {
        name: "黑蛇精",
        level: 5,
    },
    2026: {
        name: "白骨蜘蛛",
        level: 5,
    },
    2027: {
        name: "神秘高手",
        level: 5,
    },
    2028: {
        name: "流氓",
        level: 20,
    },
    2029: {
        name: "瘪三",
        level: 22,
    },
    20210: {
        name: "亡命恶徒",
        level: 24,
    },
    20211: {
        name: "亡命狂徒",
        level: 26,
    },
    20212: {
        name: "神秘刺客",
        level: 28,
    },
    20213: {
        name: "血魔宗外门弟子",
        level: 30,
    },
    20214: {
        name: "独角狮虎",
        level: 28,
    },
    20215: {
        name: "血魔宗内门弟子",
        level: 30,
    },
    20216: {
        name: "光头纸人",
        level: 28,
    },
    20217: {
        name: "长发纸人",
        level: 30,
    },
    20218: {
        name: "红木古树",
        level: 28,
    },
    20219: {
        name: "盗墓贼",
        level: 30,
    },
    20220: {
        name: "古墓游尸",
        level: 28,
    },
    20222: {
        name: "五色毒蛛",
        level: 30,
    },
    20223: {
        name: "尸煞",
        level: 28,
    },
    20224: {
        name: "魔族弟子",
        level: 30,
    },

    20225: {
        name: "金甲魔虫",
        level: 28,
    },
    20226: {
        name: "看守弟子",
        level: 30,
    },
    20227: {
        name: "入魔修士",
        level: 28,
    },
    20228: {
        name: "红石骨魔",
        level: 30,
    },
    20229: {
        name: "红河水鬼",
        level: 28,
    },
    20230: {
        name: "紫叶花魔",
        level: 30,
    },
    20231: {
        name: "食人魔",
        level: 30,
    },
    20232: {
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
