const articleMap = {
    190: {
        name: '魔化皮',
        value: 50,
        ele: 1,
        tips: '魔化皮，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    191: {
        name: '紫叶草',
        value: 100,
        ele: 1,
        tips: '紫叶草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    192: {
        name: '幽冥叶',
        value: 200,
        ele: 1,
        tips: '紫叶草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    193: {
        name: '壶嘴',
        value: 50,
        tips: '壶嘴，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    194: {
        name: '神马皮',
        value: 100,
        tips: '神马皮，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    195: {
        name: '紫霄雷',
        value: 200,
        tips: '紫霄雷，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    196: {
        name: '寒灵',
        value: 50,
        tips: '寒灵，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    197: {
        name: '冰凌晶',
        value: 100,
        tips: '冰凌晶，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    198: {
        name: '黄泉水',
        value: 200,
        tips: '黄泉水，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    199: {
        name: '避水皮',
        value: 50,
        tips: '避水皮，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1910: {
        name: '蟹壳',
        value: 100,
        tips: '蟹壳，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1911: {
        name: '无根水',
        value: 200,
        tips: '无根水，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1912: {
        name: '赤炎',
        value: 50,
        tips: '赤炎，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    1913: {
        name: '凤羽',
        value: 100,
        tips: '凤羽，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    1914: {
        name: '地狱火',
        value: 200,
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
    }

}