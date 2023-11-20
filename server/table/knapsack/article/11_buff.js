const articleMap = {
    110: {
        n: '小体力丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '使用后生命上限+2500,持续120分钟。',
    },
    111: {
        n: '小法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '使用后法力上限+1000,持续120分钟。',
    },
    112: {
        n: '小攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '使用后攻击上限+250,持续120分钟。',
    },
    113: {
        n: '小防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '使用后防御上限+120,持续120分钟。',
    },
    114: {
        n: '中体力丹',
        price: 20000,
        unit: 'tael',
        group2: 'life_max-1-5000',
        tips: '使用后生命上限+5000,持续120分钟。',
    },
    115: {
        n: '中法力丹',
        price: 20000,
        unit: 'tael',
        group2: 'mana_max-1-2500',
        tips: '使用后法力上限+2500,持续120分钟。',
    },
    116: {
        n: '中攻击丹',
        price: 20000,
        unit: 'tael',
        group2: 'atk-1-500',
        tips: '使用后攻击上限+500,持续120分钟。',
    },
    117: {
        n: '中防御丹',
        price: 20000,
        unit: 'tael',
        group2: 'dfs-1-250',
        tips: '使用后防御上限+250,持续120分钟。',
    },
    118: {
        n: '大体力丹',
        price: 100000,
        unit: 'tael',
        group2: 'life_max-1-10000',
        tips: '使用后生命上限+10000,持续120分钟。',
    },
    119: {
        n: '大法力丹',
        price: 100000,
        unit: 'tael',
        group2: 'mana_max-1-5000',
        tips: '使用后法力上限+5000,持续120分钟。',
    },
    1110: {
        n: '大攻击丹',
        price: 100000,
        unit: 'tael',
        group2: 'atk-1-1000',
        tips: '使用后攻击上限+1000,持续120分钟。',
    },
    1111: {
        n: '大防御丹',
        price: 100000,
        unit: 'tael',
        group2: 'dfs-1-500',
        tips: '使用后防御上限+500,持续120分钟。',
    },
    1112: {
        n: '超级体力丹',
        price: 200000,
        unit: 'tael',
        group2: 'life_max-1-25000',
        tips: '使用后生命上限+25000,持续120分钟。',
    },
    1113: {
        n: '超级法力丹',
        price: 200000,
        unit: 'tael',
        group2: 'mana_max-1-10000',
        tips: '使用后法力上限+10000,持续120分钟。',
    },
    1114: {
        n: '超级攻击丹',
        price: 200000,
        unit: 'tael',
        group2: 'atk-1-2500',
        tips: '使用后攻击上限+2500,持续120分钟。',
    },
    1115: {
        n: '超级防御丹',
        price: 200000,
        unit: 'tael',
        group2: 'dfs-1-1000',
        tips: '使用后防御上限+1000,持续120分钟。',
    },
    1116: {
        n: '神魔血丹',
        group2: 'life_max-1-100000',
        tips: '使用后生命上限+100000,持续120分钟。',
    },
    1117: {
        n: '九天圣泉',
        group2: 'mana_max-1-50000',
        tips: '使用后法力上限+50000,持续120分钟。',
    },
    1118: {
        n: '鬼煞真丹',
        group2: 'atk-1-10000',
        tips: '使用后攻击上限+10000,持续120分钟。',
    },
    1119: {
        n: '琉璃真丹',
        group2: 'dfs-1-5000',
        tips: '使用后防御上限+5000,持续120分钟。',
    },
    1120: {
        n: '灵血丸',
        price: 100,
        unit: 'yuanbao',
        group1: 'lx-100000',
        tips: '蕴含10万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1121: {
        n: '大灵血丸',
        price: 700,
        unit: 'yuanbao',
        group1: 'lx-1000000',
        tips: '蕴含100万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1122: {
        n: '超灵血丸',
        price: 3000,
        unit: 'yuanbao',
        group1: 'lx-10000000',
        tips: '蕴含1000万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1123: {
        n: '双倍经验卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'exp2',
        tips: '使用后打怪可获得双倍经验,持续120分钟。',
    },
    1124: {
        n: '三倍经验卡',
        group2: 'exp3',
        tips: '使用后打怪可获得三倍经验,持续120分钟。',
    },
    1125: {
        n: '五倍经验卡',
        group2: 'exp5',
        integral: 20,
        tips: '使用后打怪可获得五倍经验,持续120分钟。',
    },
    1126: {
        n: '双倍银两卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'money2',
        tips: '使用后打怪可获得双倍银两,持续120分钟。',
    },
    1127: {
        n: '三倍银两卡',
        group2: 'money3',
        tips: '使用后打怪可获得三倍银两,持续120分钟。',
    },
    1128: {
        n: '五倍银两卡',
        group2: 'money5',
        integral: 20,
        tips: '使用后打怪可获得五倍银两,持续120分钟。',
    },
}

module.exports = {
    getArticleList: function () {
        return Object.keys(articleMap).map((id) => {
            const idNum = Number(id);
            return {
                ...articleMap[id],
                id: idNum,
            }
        })
    },
    getArticle: function (id) {
        if (!articleMap[id]) {
            console.log('未找到物品：', id);
            return;
        }
        return JSON.parse(JSON.stringify({
            ...articleMap[id],
            id,
        }))
    }

}