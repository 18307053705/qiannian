const articleMap = {
    210: {
        name: '斑斓蛇胆',
        tips: '斑斓蛇身上掉落的蛇胆，拥有暂时压制剧毒的效果。',
    },
    211: {
        name: '毒囊',
        tips: '大泽毒蛙体内的毒丹，持有此物可免疫毒瘴气。',
    },
    212: {
        name: '蛇蝎兰',
        tips: '传说中的稀世奇物，可克制世间一切毒物。',
    },
    213: {
        name: '巨蟒精血',
        tips: '大泽巨蟒体内的精血，极具灵性。',
    },
    214: {
        name: '月光草',
        tips: '一种极为神奇的灵草，在月色下会散发出幽白的月光。',
    },
    215: {
        name: '冰系魔核',
        tips: '一棵圆润的魔核散发森白的寒气，仿佛能冰冻一切。',
    },
    216: {
        name: '紫藤罗花',
        tips: '一种生长在荒漠的奇异花朵，拥有解除蛇毒的效果。',
    },
    217: {
        name: '清水',
        tips: '从小型仙人掌身上采集到的甘甜可口的清水。',
    },
    218: {
        name: '幻灵青涎',
        tips: '一种蕴含强大灵魂力量的灵药，可以用于炼制修复灵魂的稀有丹药。',
    },
    219: {
        name: '大地之石',
        tips: '一种蕴含强大生命力的奇石，据说生长在大地深处极难寻找。',
    },
    2110: {
        name: '朱砂',
        tips: '红木古树身上掉落的一种细小砂砾，或许有一定的通幽效果。',
    },
    2111: {
        name: '金丝皮',
        tips: '金丝古树身上掉落的树皮，可以用来制作纸人的身躯。',
    },
    2112: {
        name: '黄砂砾',
        tips: '一种黄色的细小砂砾，可以用来制作黄符。',
    },    
    2113: {
        name: '桑果',
        tips: '桑树上掉落的一种果实，甘甜可口极为解渴。',
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
    },
    getArticleMap: function () {
        return JSON.parse(JSON.stringify(articleMap))
    }

}
