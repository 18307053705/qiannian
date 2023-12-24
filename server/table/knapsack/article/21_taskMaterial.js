const articleMap = {
    210: {
        name: '斑斓蛇胆',
        tips: '斑斓蛇身上掉落的蛇胆，拥有压制断魂散的药性。',
    },
    211: {
        name: '蛇妖胆汁',
        tips: '蛇妖身上的掉落的蛇胆胆汁，奇苦无比。',
    },
    212: {
        name: '桑果',
        tips: '桑树妖身上的掉落的一种果子，味道极为甘甜。',
    },
    213: {
        name: '赤炎蛛腿',
        tips: '赤炎蜘蛛身上的掉落腿，看起来毛茸茸的。',
    },
    214: {
        name: '灵异水',
        tips: '灵异小妖身上携带的一种灵水，极为纯净。',
    },
    215: {
        name: '毒丹',
        tips: '大泽毒蛙体内的毒丹，天生克制大泽毒蟾吐出的紫色毒雾。',
    },
    216: {
        name: '魔熊皮',
        tips: '大地魔熊的皮，极为坚硬，能抵御各种。',
    },
    217: {
        name: '冰凌晶',
        tips: '冰凌晶，蕴含了冰元素的材料,可用于聚宝盆进行聚宝。',
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
