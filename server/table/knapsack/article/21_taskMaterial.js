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
        name: '藏羚羊皮',
        tips: '藏羚羊身上的掉落毛皮，还有一股腥味。',
    },
    214: {
        name: '巨羊角',
        tips: '巨角羊身上最坚硬的地方，极其锋利。',
    },
    215: {
        name: '桑果',
        tips: '桑树上结出的一种果子，味道甘甜，很适合解渴。',
    },
    216: {
        name: '赤炎蛛腿',
        tips: '赤炎蜘蛛的腿，看起来有些毛茸茸的。',
    },
    217: {
        name: '灵异水',
        tips: '一种比较稀少的水，蕴含澎湃的灵气。',
    },
    218: {
        name: '黄泉水',
        tips: '黄泉水，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    219: {
        name: '避水皮',
        tips: '避水皮，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    2110: {
        name: '蟹壳',
        tips: '蟹壳，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    2111: {
        name: '无根水',
        tips: '无根水，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    2112: {
        name: '赤炎',
        tips: '赤炎，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    2113: {
        name: '凤羽',
        tips: '凤羽，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    2114: {
        name: '地狱火',
        tips: '地狱火，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
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
