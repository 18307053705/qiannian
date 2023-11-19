// 技能类型type 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
// group 1 直接改变某属性（例如恢复药，声望卷轴,元宝卡,银票，勋章宝石一类)
// group 2 buff类型 如双倍经验卡，临时提升属性的丹药

const articleMap = {
    100: {
        n: '小血瓶',
        price: 2000,
        group1: 'life-5000',
        tips: '使用后可以恢复5000生命值。',
    },
    101: {
        n: '小蓝瓶',
        price: 2000,
        group1: 'mana-2000',
        tips: '使用后可以恢复2000法力值。',
    },
    102: {
        n: '中血瓶',
        price: 5000,
        group1: 'life-10000',
        tips: '使用后可以恢复10000生命值。',
    },
    103: {
        n: '中蓝瓶',
        price: 5000,
        group1: 'mana-5000',
        tips: '使用后可以恢复5000法力值。',
    },
    104: {
        n: '大血瓶',
        price: 20000,
        group1: 'life-50000',
        tips: '使用后可以恢复50000生命值。',
    },
    105: {
        n: '大蓝瓶',
        price: 20000,
        group1: 'mana-20000',
        tips: '使用后可以恢复20000法力值。',
    },
    106: {
        n: '超级血瓶',
        price: 50000,
        group1: 'life-100000',
        tips: '使用后可以恢复100000生命值。',
    },
    107: {
        n: '超级蓝瓶',
        price: 50000,
        group1: 'mana-50000',
        tips: '使用后可以恢复50000法力值。',
    },
    108: {
        n: '天山雪莲',
        price: 100000,
        group1: 'life-250000',
        tips: '使用后可以恢复250000生命值。',
    },
    109: {
        n: '天山真水',
        price: 100000,
        group1: 'mana-100000',
        tips: '使用后可以恢复100000法力值。',
    },
    1010: {
        n: '千年首乌',
        price: 200000,
        group1: 'life-500000',
        tips: '使用后可以恢复500000生命值。',
    },
    1011: {
        n: '琼浆玉液',
        price: 200000,
        group1: 'mana-200000',
        tips: '使用后可以恢复200000法力值。',
    },
}

module.exports = {
    getArticleList: function () {
        Object.keys(articleMap).map((id) => ({
            ...articleMap[id],
            id,
            unit: 'tael',
        }))
    },
    getArticle: function (articleId) {
        if (!articleMap[articleId]) {
            console.log('未找到物品：', articleId);
            return;
        }
        return JSON.parse(JSON.stringify({
            ...articleMap[id],
            id,
            unit: 'tael',
        }))
    }

}
