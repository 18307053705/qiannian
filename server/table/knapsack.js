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
        tips: '使用后可以恢复2000生命值。',
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
        tips: '使用后可以恢复2000法力值。',
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
        tips: '使用后可以恢复10000生命值。',
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
        tips: '使用后可以恢复5000法力值。',
    },
    5: {
        id: 5,
        type: 2,
        n: '神魔血丹',
        price: 5000,
        sell: 1000,
        effect: {
            life: 5000,
        },
        tips: '使用后生命上限+5000,持续120分钟。',
    },
    6: {
        id: 6,
        type: 4,
        n: '双倍经验卡',
        sell: 0,
        effect: {
            exp2: 1,
        },
        tips: '使用后打怪可获得双倍经验,持续120分钟。',
    },
    7: {
        id: 7,
        type: 4,
        n: '三倍经验卡',
        sell: 0,
        effect: {
            exp3: 1,
        },
        tips: '使用后打怪可获得三倍经验,持续120分钟。',
    },
    8: {
        id: 8,
        type: 4,
        n: '五倍经验卡',
        sell: 0,
        effect: {
            exp5: 1,
        },
        tips: '使用后打怪可获得五倍经验,持续120分钟。',
    },
    9: {
        id: 9,
        type: 4,
        n: '双倍银两卡',
        sell: 0,
        effect: {
           money2: 1,
        },
        tips: '使用后打怪可获得双倍银两,持续120分钟。',
    },
    10: {
        id: 10,
        type: 4,
        n: '三倍银两卡',
        sell: 0,
        effect: {
           money3: 1,
        },
        tips: '使用后打怪可获得三倍银两,持续120分钟。',
    },
    11: {
        id: 11,
        type: 4,
        n: '五倍银两卡',
        sell: 0,
        effect: {
           money5: 1,
        },
        tips: '使用后打怪可获得五倍银两,持续120分钟。',
    },
    12: {
        id: 12,
        type: 4,
        n: '世界声望卷轴',
        sell: 0,
        reputation: {
            world: 100,
        },
        tips: '使用后可获得100世界声望。',
    },
    13: {
        id: 13,
        type: 4,
        n: '帮会声望卷轴',
        sell: 0,
        reputation: {
            secret: 100,
        },
        tips: '使用后可获得100帮会声望。',
    },
    14: {
        id: 14,
        type: 4,
        n: '结义声望卷轴',
        sell: 0,
        reputation: {
            brother: 100,
        },
        tips: '使用后可获得100结义声望。',
    },
    15: {
        id: 15,
        type: 4,
        n: '世界功勋卷轴',
        sell: 0,
        reputation: {
            exploit: 100,
        },
        tips: '使用后可获得100功勋。',
    },
    16: {
        id: 16,
        type: 4,
        n: '世界名气卷轴',
        sell: 0,
        reputation: {
            fame: 100,
        },
        tips: '使用后可获得100名气。',
    },
}