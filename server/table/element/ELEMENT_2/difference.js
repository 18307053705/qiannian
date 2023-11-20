const freakMap = {
    2060: {
        name: "花草精灵",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2061: {
        name: "湖中蛟龙",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2062: {
        name: "竹林小妖",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2063: {
        name: "古神藤龙",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2064: {
        name: "月宫来客",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2065: {
        name: "上古青龙",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2066: {
        name: "上古朱雀",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2067: {
        name: "上古玄武",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2068: {
        name: "上古白虎",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    2069: {
        name: "上古麒麟",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    20610: {
        name: "上古阵灵",
        isRanks: true,
        level: 1,
        attr: 1,
    },
    20611: {
        name: "白灵子",
        grade: 2,
        level: 30,
        attr: 1,
        integral: 1,
    },
    20612: {
        name: "蓝灵子",
        grade: 2,
        level: 30,
        attr: 1,
        integral: 3,
    },
    20613: {
        name: "红灵子",
        grade: 2,
        level: 40,
        attr: 1,
        integral: 5,
    },
    20614: {
        name: "紫灵子",
        grade: 2,
        level: 50,
        attr: 1,
        integral: 10,
    },

    20615: {
        name: "黄阶魔将",
        level: 120,
        grade: 3,
        attr: 10,
    },
    20616: {
        name: "玄阶魔将",
        level: 120,
        grade: 3,
        attr: 10,
    },
    20617: {
        name: "地阶魔将",
        level: 120,
        grade: 3,
        attr: 10,
    },
    20618: {
        name: "天阶魔将",
        level: 120,
        grade: 3,
        attr: 10,
    },
    20619: {
        name: "海魔",
        level: 140,
        grade: 3,
        attr: 12,
    },
    20620: {
        name: "地魔",
        level: 150,
        attr: 13,
        grade: 3,
    },
    20621: {
        name: "天魔",
        level: 150,
        attr: 14,
        grade: 3,
    },
    20622: {
        name: "魔尊",
        level: 180,
        attr: 15,
        grade: 3,
    },
}

module.exports = {
    getDifferenceFreak: function (freakId) {
        if (freakMap[freakId]) {
            return {
                id: freakId,
                num: 1,
                ...JSON.parse(JSON.stringify(freakMap[freakId]))
            }
        }
        return undefined;
    }
}