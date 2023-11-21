const articleMap = {
    120: {
        name: '世界声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'world-100',
        tips: '使用后可获得100世界声望。',
    },
    121: {
        name: '帮会声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'gang-100',
        tips: '使用后可获得100帮会声望。',
    },
    122: {
        name: '结义声望卷轴',
        price: 200,
        unit: 'yuanbao',
        group1: 'intersect-100',
        tips: '使用后可获得100结义声望。',
    },
    123: {
        name: '世界功勋卷轴',
        price: 400,
        unit: 'yuanbao',
        group1: 'exploit-100',
        tips: '使用后可获得100功勋。',
    },
    124: {
        name: '世界名气卷轴',
        price: 1000,
        unit: 'yuanbao',
        group1: 'fame-100',
        tips: '使用后可获得100名气。',
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
