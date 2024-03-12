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
        name: "巨石兽",
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
        name: "白骨蜘蛛",
        level: 5,
    },
    20217: {
        name: "黑蛇精",
        level: 5,
    },
    20218: {
        name: "护洞蛇妖",
        level: 5,
    },
    // 不夜城
    20221: {
        name: "荒漠毒蝎",
        level: 20,
        article: '216-1-50'
    },
    20222: {
        name: "荒漠毒蛇",
        level: 22,
    },
    20223: {
        name: "小型仙人掌",
        level: 24,
        article: '217-1-50'
    },
    20224: {
        name: "巨型仙人掌",
        level: 26,
    },
    20225: {
        name: "地痞",
        level: 28,
    },
    20226: {
        name: "流氓",
        level: 30,
    },
    20227: {
        name: "幻青蛇",
        level: 28,
        article: '218-1-50'
    },
    20228: {
        name: "食金兽",
        level: 30,
        article: '219-1-50'
    },
    // 迷雾森林
    20231: {
        name: "纸人男童",
        level: 28,
    },
    20232: {
        name: "纸人女童",
        level: 30,
    },
    20233: {
        name: "红木古树",
        level: 28,
        article: '2110-1-50'
    },
    20234: {
        name: "金丝古树",
        level: 30,
        article: '2111-1-50'
    },
    20235: {
        name: "幻境游魂",
        level: 28,
    },
    20236: {
        name: "幻境行尸",
        level: 30,
    },
    20237: {
        name: "百年白蚁",
        level: 28,
        article: '2112-1-50'
    },
    20238: {
        name: "百年猴精",
        level: 30,
    },
    // 妖魔岭
    20241: {
        name: "尸魔虫",
        level: 28,
    },
    20242: {
        name: "尸魔鹰",
        level: 30,
    },
    20243: {
        name: "粉红毒蝎",
        level: 28,
    },
    20244: {
        name: "红石骨魔",
        level: 30,
    },
    20245: {
        name: "狐族高手",
        level: 28,
    },
    20246: {
        name: "狐族精英",
        level: 30,
    },
    // 20247: {
    //     name: "食人魔",
    //     level: 30,
    // },
    // 20248: {
    //     name: "魔族高手",
    //     level: 30,
    // },
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
