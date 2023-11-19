// 技能类型type 1:消耗品 2:buff丹药 3:装备 4:卷轴 5:材料 6:任务 7:杂物
// group 1 直接改变某属性（例如恢复药，声望卷轴,元宝卡,银票，勋章宝石一类)
// group 2 buff类型 如双倍经验卡，临时提升属性的丹药

const articleMap = {
    120: {
        n: '世界声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'world-100',
        tips: '使用后可获得100世界声望。',
    },
    121: {
        n: '帮会声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'gang-100',
        tips: '使用后可获得100帮会声望。',
    },
    122: {
        n: '结义声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'intersect-100',
        tips: '使用后可获得100结义声望。',
    },
    123: {
        n: '世界功勋卷轴',
        price: 400,
        unit: 'yuanbao',
        group1: 'exploit-100',
        tips: '使用后可获得100功勋。',
    },
    124: {
        n: '世界名气卷轴',
        price: 1000,
        unit: 'yuanbao',
        group1: 'fame-100',
        tips: '使用后可获得100名气。',
    },
}

module.exports = {
    getArticleList: function () {
        Object.keys(articleMap).map((id) => ({
            ...articleMap[id],
            id,
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
        }))
    }

}
