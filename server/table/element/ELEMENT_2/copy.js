const freakMap = {
    2050: {
        name: "白魂郎君",
        level: 25,
    },
    2051: {
        name: "绿魂郎君",
        level: 25,
    },
    2052: {
        name: "蓝魂郎君",
        level: 25,
    },
    2053: {
        name: "青魂郎君",
        level: 25,
    },
    2054: {
        name: "金魂郎君",
        level: 25,
    },
    2055: {
        name: "红魂郎君",
        level: 25,
    },
    2056: {
        name: "紫魂郎君",
        level: 25,
    },
    2057: {
        name: "幽毒郎君",
        level: 25,
    },
    2058: {
        name: "幽冥凶魂",
        level: 25,
        noBoss: true,
    },
    2059: {
        name: "幽冥怨魂",
        level: 25,
        noBoss: true,
    },
}


module.exports = {
    getCopyFreak: function (freakId) {
        if (freakMap[freakId]) {
            const base = {
                id: freakId,
                grade: 2,
                tag: 2,
                attrType: 1,
                num: 1,
                attr: 2
            }
            const { level, noBoss, ...freak } = JSON.parse(JSON.stringify(freakMap[freakId]));
            if (level === 25 && !noBoss) {
                base.exp = 50000;
                base.tael = 5000;
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