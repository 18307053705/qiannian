const articleMap = {
    190: {
        name: '风铃草',
        value: 10,
        ele: 1,
        tips: '风铃草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    191: {
        name: '虾嘴',
        value: 25,
        ele: 1,
        tips: '虾嘴，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    192: {
        name: '幽冥草',
        value: 100,
        ele: 1,
        tips: '幽冥草，蕴含了风元素的材料,可用于聚宝盆进行聚宝。',
    },
    193: {
        name: '赤炎蛛丝',
        value: 10,
        ele: 2,
        tips: '赤炎蛛丝，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    194: {
        name: '蟹壳',
        value: 25,
        ele: 2,
        tips: '蟹壳，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    195: {
        name: '彼岸花',
        value: 100,
        ele: 2,
        tips: '彼岸花，蕴含了雷元素的材料,可用于聚宝盆进行聚宝。',
    },
    196: {
        name: '灵异水',
        value: 10,
        ele: 3,
        tips: '灵异水，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    197: {
        name: '紫叶草',
        value: 25,
        ele: 3,
        tips: '紫叶草，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    198: {
        name: '忘川水',
        value: 100,
        ele: 3,
        tips: '忘川水，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
    },
    199: {
        name: '避水丹',
        value: 10,
        ele: 4,
        tips: '避水丹，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1910: {
        name: '神马皮',
        value: 25,
        ele: 4,
        tips: '神马皮，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1911: {
        name: '黄泉水',
        value: 100,
        ele: 4,
        tips: '黄泉水，蕴含了水元素的材料,可用于聚宝盆进行聚宝。',
    },
    1912: {
        name: '赤炎蛛腿',
        value: 10,
        ele: 5,
        tips: '赤炎蛛腿，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    1913: {
        name: '巨鲸牙',
        value: 25,
        ele: 5,
        tips: '巨鲸牙，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
    },
    1914: {
        name: '幽冥火',
        value: 100,
        ele: 5,
        tips: '幽冥火，蕴含了火元素的材料,可用于聚宝盆进行聚宝。',
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
    getArticleMap:function(){
        return JSON.parse(JSON.stringify(articleMap))
    }

}