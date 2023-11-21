const articleMap = {
    110: {
        name: '小体力丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '使用后生命上限+2500,持续120分钟。',
    },
    111: {
        name: '小法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '使用后法力上限+1000,持续120分钟。',
    },
    112: {
        name: '小攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '使用后攻击上限+250,持续120分钟。',
    },
    113: {
        name: '小防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '使用后防御上限+120,持续120分钟。',
    },
    114: {
        name: '中体力丹',
        price: 20000,
        unit: 'tael',
        group2: 'life_max-1-5000',
        tips: '使用后生命上限+5000,持续120分钟。',
    },
    115: {
        name: '中法力丹',
        price: 20000,
        unit: 'tael',
        group2: 'mana_max-1-2500',
        tips: '使用后法力上限+2500,持续120分钟。',
    },
    116: {
        name: '中攻击丹',
        price: 20000,
        unit: 'tael',
        group2: 'atk-1-500',
        tips: '使用后攻击上限+500,持续120分钟。',
    },
    117: {
        name: '中防御丹',
        price: 20000,
        unit: 'tael',
        group2: 'dfs-1-250',
        tips: '使用后防御上限+250,持续120分钟。',
    },
    118: {
        name: '大体力丹',
        price: 100000,
        unit: 'tael',
        group2: 'life_max-1-10000',
        tips: '使用后生命上限+10000,持续120分钟。',
    },
    119: {
        name: '大法力丹',
        price: 100000,
        unit: 'tael',
        group2: 'mana_max-1-5000',
        tips: '使用后法力上限+5000,持续120分钟。',
    },
    1110: {
        name: '大攻击丹',
        price: 100000,
        unit: 'tael',
        group2: 'atk-1-1000',
        tips: '使用后攻击上限+1000,持续120分钟。',
    },
    1111: {
        name: '大防御丹',
        price: 100000,
        unit: 'tael',
        group2: 'dfs-1-500',
        tips: '使用后防御上限+500,持续120分钟。',
    },
    1112: {
        name: '超级体力丹',
        price: 200000,
        unit: 'tael',
        group2: 'life_max-1-25000',
        tips: '使用后生命上限+25000,持续120分钟。',
    },
    1113: {
        name: '超级法力丹',
        price: 200000,
        unit: 'tael',
        group2: 'mana_max-1-10000',
        tips: '使用后法力上限+10000,持续120分钟。',
    },
    1114: {
        name: '超级攻击丹',
        price: 200000,
        unit: 'tael',
        group2: 'atk-1-2500',
        tips: '使用后攻击上限+2500,持续120分钟。',
    },
    1115: {
        name: '超级防御丹',
        price: 200000,
        unit: 'tael',
        group2: 'dfs-1-1000',
        tips: '使用后防御上限+1000,持续120分钟。',
    },
    1116: {
        name: '神魔血丹',
        group2: 'life_max-1-100000',
        tips: '使用后生命上限+100000,持续120分钟。',
    },
    1117: {
        name: '九天圣泉',
        group2: 'mana_max-1-50000',
        tips: '使用后法力上限+50000,持续120分钟。',
    },
    1118: {
        name: '鬼煞真丹',
        group2: 'atk-1-10000',
        tips: '使用后攻击上限+10000,持续120分钟。',
    },
    1119: {
        name: '琉璃真丹',
        group2: 'dfs-1-5000',
        tips: '使用后防御上限+5000,持续120分钟。',
    },
    1120: {
        name: '灵血丸',
        price: 100,
        unit: 'yuanbao',
        group1: 'lx-100000',
        tips: '蕴含10万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1121: {
        name: '大灵血丸',
        price: 700,
        unit: 'yuanbao',
        group1: 'lx-1000000',
        tips: '蕴含100万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1122: {
        name: '超灵血丸',
        price: 3000,
        unit: 'yuanbao',
        group1: 'lx-10000000',
        tips: '蕴含1000万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1123: {
        name: '双倍经验卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'exp2',
        tips: '使用后打怪可获得双倍经验,持续120分钟。',
    },
    1124: {
        name: '三倍经验卡',
        group2: 'exp3',
        tips: '使用后打怪可获得三倍经验,持续120分钟。',
    },
    1125: {
        name: '五倍经验卡',
        group2: 'exp5',
        integral: 20,
        tips: '使用后打怪可获得五倍经验,持续120分钟。',
    },
    1126: {
        name: '双倍银两卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'money2',
        tips: '使用后打怪可获得双倍银两,持续120分钟。',
    },
    1127: {
        name: '三倍银两卡',
        group2: 'money3',
        tips: '使用后打怪可获得三倍银两,持续120分钟。',
    },
    1128: {
        name: '五倍银两卡',
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