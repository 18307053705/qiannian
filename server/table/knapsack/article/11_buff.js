const articleMap = {
    110: {
        name: '一品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '一品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    111: {
        name: '一品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '一品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    112: {
        name: '一品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '一品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    113: {
        name: '一品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '一品防御丹，使用后防御上限+120,持续120分钟。',
    },
    114: {
        name: '二品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '二品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    115: {
        name: '二品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '二品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    116: {
        name: '二品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '二品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    117: {
        name: '二品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '二品防御丹，使用后防御上限+120,持续120分钟。',
    },
    118: {
        name: '三品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '三品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    119: {
        name: '三品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '三品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1110: {
        name: '三品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '三品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1111: {
        name: '三品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '三品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1112: {
        name: '四品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '四品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1113: {
        name: '四品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '四品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1114: {
        name: '四品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '四品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1115: {
        name: '四品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '四品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1116: {
        name: '五品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '五品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1117: {
        name: '五品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '五品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1118: {
        name: '五品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '五品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1119: {
        name: '五品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '五品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1120: {
        name: '六品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '六品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1121: {
        name: '六品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '六品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1122: {
        name: '六品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '六品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1123: {
        name: '六品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '六品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1124: {
        name: '七品气血丹',
        price: 10000,
        unit: 'tael',
        group2: 'life_max-1-2500',
        tips: '七品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1125: {
        name: '七品法力丹',
        price: 10000,
        unit: 'tael',
        group2: 'mana_max-1-1000',
        tips: '七品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1126: {
        name: '七品攻击丹',
        price: 10000,
        unit: 'tael',
        group2: 'atk-1-250',
        tips: '七品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1127: {
        name: '七品防御丹',
        price: 10000,
        unit: 'tael',
        group2: 'dfs-1-120',
        tips: '七品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1128: {
        name: '八品气血丹',
        group2: 'life_max-1-2500',
        tips: '八品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1129: {
        name: '八品法力丹',
        group2: 'mana_max-1-1000',
        tips: '八品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1130: {
        name: '八品攻击丹',
        group2: 'atk-1-250',
        tips: '八品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1131: {
        name: '八品防御丹',
        group2: 'dfs-1-120',
        tips: '八品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1132: {
        name: '九品气血丹',
        group2: 'life_max-1-2500',
        tips: '九品气血丹，使用后生命上限+2500,持续120分钟。',
    },
    1133: {
        name: '九品法力丹',
        group2: 'mana_max-1-1000',
        tips: '九品法力丹，使用后法力上限+1000,持续120分钟。',
    },
    1134: {
        name: '九品攻击丹',
        group2: 'atk-1-250',
        tips: '九品攻击丹，使用后攻击上限+250,持续120分钟。',
    },
    1135: {
        name: '九品防御丹',
        group2: 'dfs-1-120',
        tips: '九品防御丹，使用后防御上限+120,持续120分钟。',
    },
    1136: {
        name: '灵血丸',
        price: 100,
        unit: 'yuanbao',
        group1: 'lx-100000',
        tips: '蕴含10万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1137: {
        name: '大灵血丸',
        price: 700,
        unit: 'yuanbao',
        group1: 'lx-1000000',
        tips: '蕴含100万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1138: {
        name: '超灵血丸',
        price: 3000,
        unit: 'yuanbao',
        group1: 'lx-10000000',
        tips: '蕴含1000万灵血，生命值或法力低于30%时触发,消耗对应灵血补充对应状态。',
    },
    1139: {
        name: '双倍经验卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'exp2',
        tips: '使用后打怪可获得双倍经验,持续120分钟。',
    },
    1140: {
        name: '三倍经验卡',
        group2: 'exp3',
        tips: '使用后打怪可获得三倍经验,持续120分钟。',
    },
    1141: {
        name: '五倍经验卡',
        group2: 'exp5',
        integral: 20,
        tips: '使用后打怪可获得五倍经验,持续120分钟。',
    },
    1142: {
        name: '双倍银两卡',
        price: 200,
        unit: 'yuanbao',
        group2: 'money2',
        tips: '使用后打怪可获得双倍银两,持续120分钟。',
    },
    1143: {
        name: '三倍银两卡',
        group2: 'money3',
        tips: '使用后打怪可获得三倍银两,持续120分钟。',
    },
    1144: {
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