const articleMap = {
    100: {
        name: '一品凝血散',
        price: 2000,
        group1: 'life-5000',
        tips: '一品凝血散，使用后可以恢复5000生命值。',
    },
    101: {
        name: '一品聚气散',
        price: 2000,
        group1: 'mana-3000',
        tips: '一品聚气散，使用后可以恢复3000法力值。',
    },
    102: {
        name: '二品凝血散',
        price: 5000,
        group1: 'life-10000',
        tips: '一品凝血散，使用后可以恢复10000生命值。',
    },
    103: {
        name: '二品聚气散',
        price: 5000,
        group1: 'mana-5000',
        tips: '二品聚气散，使用后可以恢复5000法力值。',
    },
    104: {
        name: '三品凝血散',
        price: 20000,
        group1: 'life-30000',
        tips: '三品凝血散，使用后可以恢复30000生命值。',
    },
    105: {
        name: '三品聚气散',
        price: 20000,
        group1: 'mana-10000',
        tips: '三品聚气散，使用后可以恢复10000法力值。',
    },
    106: {
        name: '四品凝血散',
        price: 50000,
        group1: 'life-50000',
        tips: '四品凝血散，使用后可以恢复50000生命值。',
    },
    107: {
        name: '四品聚气散',
        price: 50000,
        group1: 'mana-25000',
        tips: '四品聚气散，使用后可以恢复25000法力值。',
    },
    108: {
        name: '五品凝血散',
        price: 100000,
        group1: 'life-100000',
        tips: '五品凝血散，使用后可以恢复100000生命值。',
    },
    109: {
        name: '五品聚气散',
        price: 100000,
        group1: 'mana-50000',
        tips: '五品聚气散，使用后可以恢复50000法力值。',
    },
    1010: {
        name: '六品凝血散',
        price: 200000,
        group1: 'life-500000',
        tips: '六品凝血散，使用后可以恢复500000生命值。',
    },
    1011: {
        name: '六品聚气散',
        price: 200000,
        group1: 'mana-300000',
        tips: '六品聚气散，使用后可以恢复300000法力值。',
    },
    1010: {
        name: '七品凝血散',
        price: 200000,
        group1: 'life-1000000',
        tips: '七品凝血散，使用后可以恢复1000000生命值。',
    },
    1011: {
        name: '七品聚气散',
        price: 200000,
        group1: 'mana-500000',
        tips: '七品聚气散，使用后可以恢复500000法力值。',
    },
    1010: {
        name: '八品凝血散',
        group1: 'life-2000000',
        tips: '八品凝血散，使用后可以恢复2000000生命值。',
    },
    1011: {
        name: '八品聚气散',
        group1: 'mana-1000000',
        tips: '八品聚气散，使用后可以恢复1000000法力值。',
    },
    1012: {
        name: '九品凝血散',
        group1: 'life-5000000',
        tips: '九品凝血散，使用后可以恢复5000000生命值。',
    },
    1013: {
        name: '九品聚气散',
        group1: 'mana-3000000',
        tips: '九品聚气散，使用后可以恢复3000000法力值。',
    },
}

module.exports = {
    getArticleList: function () {
        return Object.keys(articleMap).map((id) => {
            const idNum = Number(id);
            return {
                ...articleMap[id],
                id: idNum,
                unit: 'tael',
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
            unit: 'tael',
        }))
    }

}

