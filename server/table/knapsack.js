// 技能类型type 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
module.exports = {
    size: 200,
    1: {
        id: 1,
        type: 1,
        n: '天山雪莲',
        price: 2000,
        sell: 1000,
        effect: {
            life: 2000,
        },
        msg: '使用后可以恢复2000生命值。',
    },
    2: {
        id: 2,
        type: 1,
        n: '天山真水',
        price: 2000,
        sell: 1000,
        effect: {
            mana: 2000,
        },
        msg: '使用后可以恢复2000法力值。',
    },
    3: {
        id: 3,
        type: 1,
        n: '万年人参',
        price: 5000,
        sell: 1000,
        effect: {
            life: 10000,
        },
        msg: '使用后可以恢复10000生命值。',
    },
    4: {
        id: 4,
        type: 1,
        n: '千年首乌',
        price: 5000,
        sell: 1000,
        effect: {
            mana: 5000,
        },
        msg: '使用后可以恢复5000法力值。',
    },
    5: {
        id: 5,
        type: 1,
        n: '神魔血丹',
        price: 5000,
        sell: 1000,
        effect: {
            life: 5000,
        },
        msg: '使用后生命上限+5000,持续30分钟。',
    },

}