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