const list = [
    {
        id: 1010,
        name: '七品凝血散',
        r: 50,
        num: 10,
        min: 50,
        max: 200,
    },
    {
        id: 1011,
        name: '七品聚气散',
        r: 50,
        num: 10,
        min: 50,
        max: 200,
    },
    {
        id: 1012,
        name: '八品凝血散',
        r: 50,
        num: 5,
        min: 50,
        max: 100,
    },
    {
        id: 1013,
        name: '八品聚气散',
        r: 50,
        num: 5,
        min: 50,
        max: 100,
    },
    {
        id: 1124,
        name: '七品气血丹',
        r: 30,
        num: 5,
        min: 3,
        max: 10,
    },
    {
        id: 1125,
        name: '七品法力丹',
        r: 30,
        num: 5,
        min: 3,
        max: 10,
    },
    {
        id: 1126,
        name: '七品攻击丹',
        r: 30,
        num: 5,
        min: 3,
        max: 10,
    },
    {
        id: 1127,
        name: '七品防御丹',
        r: 30,
        num: 5,
        min: 3,
        max: 10,
    },
    {
        id: 1136,
        name: '灵血丸',
        s: 1,
        r: 30,
        num: 8,
    },
    {
        id: 1140,
        name: '三倍经验卡',
        s: 1,
        r: 10,
        num: 3,
    },
    {
        id: 1141,
        name: '五倍经验卡',
        s: 1,
        r: 10,
        num: 3,
    },
    {
        id: 1620,
        name: '经验丹',
        s: 1,
        r: 10,
        num: 5,
    },
    {
        id: 1625,
        name: '60元宝卡',
        s: 1,
        r: 30,
        num: 5,
    },
    {
        id: 1626,
        name: '100元宝卡',
        s: 1,
        r: 10,
        num: 5,
    },
    {
        id: 1627,
        name: '200元宝卡',
        s: 1,
        r: 5,
        num: 5,
    },

]

module.exports = {
    /**
     * 获取掉落物品
     */
    shedRandom: function () {
        const shed = [];
        const uid = new Date() * 1;
        list.forEach(({ id, name, s, num, r, min, max }, index) => {
            new Array(num).fill().forEach((_, in_x) => {
                const rate = Math.floor(Math.random() * 100) + 1;
                if (r > rate) {
                    shed.push({
                        id,
                        name,
                        s: s || Math.floor(Math.random() * (max - min)) + min,
                        uid: `${uid}_${index}_${in_x}`
                    })
                }
            })
        })
        return shed;
    }

}