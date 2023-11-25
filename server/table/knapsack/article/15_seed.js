const articleMap = {
    151: {
        name: '薰衣草种子',
        unit: 'tael',
        price: 5000,
        value: 120,
        tips: '薰衣草的种子，可在房屋内种植，收获时间120分钟。',
    },
    152: {
        name: '铃兰种子',
        unit: 'tael',
        price: 5000,
        value: 120,
        tips: '铃兰的种子，可在房屋内种植，收获时间120分钟。',
    },
    153: {
        name: '蒲公英种子',
        unit: 'tael',
        price: 10000,
        value: 180,
        tips: '蒲公英的种子，可在房屋内种植，收获时间180分钟。',
    },
    154: {
        name: '桔梗种子',
        unit: 'tael',
        price: 10000,
        value: 180,
        tips: '桔梗的种子，可在房屋内种植，收获时间180分钟。',
    },
    155: {
        name: '风信子种子',
        unit: 'tael',
        price: 10000,
        value: 180,
        tips: '风信子的种子，可在房屋内种植，收获时间180分钟。',
    },
    156: {
        name: '蔷薇种子',
        unit: 'tael',
        price: 10000,
        value: 180,
        tips: '蔷薇的种子，可在房屋内种植，收获时间180分钟。',
    },
    157: {
        name: '茉莉种子',
        unit: 'tael',
        price: 50000,
        value: 240,
        tips: '茉莉的种子，可在房屋内种植，收获时间240分钟。',
    },
    158: {
        name: '山药种子',
        unit: 'tael',
        price: 50000,
        value: 240,
        tips: '山药的种子，可在房屋内种植，收获时间240分钟。',
    },
    159: {
        name: '向日葵种子',
        unit: 'tael',
        price: 50000,
        value: 240,
        tips: '向日葵的种子，可在房屋内种植，收获时间240分钟。',
    },
    1510: {
        name: '丁香种子',
        unit: 'tael',
        price: 50000,
        value: 240,
        tips: '丁香的种子，可在房屋内种植，收获时间240分钟。',
    },
    1511: {
        name: '百合种子',
        unit: 'tael',
        price: 500000,
        value: 300,
        tips: '百合的种子，可在房屋内种植，收获时间300分钟。',
    },
    1512: {
        name: '牡丹种子',
        unit: 'tael',
        price: 500000,
        value: 300,
        tips: '牡丹的种子，可在房屋内种植，收获时间300分钟。',
    },
    1513: {
        name: '玫瑰种子',
        unit: 'tael',
        price: 500000,
        value: 300,
        tips: '玫瑰的种子，可在房屋内种植，收获时间300分钟。',
    },
    1514: {
        name: '郁金香种子',
        unit: 'tael',
        price: 2000000,
        value: 360,
        tips: '郁金香的种子，可在房屋内种植，收获时间360分钟。',
    },
    1515: {
        name: '水仙种子',
        unit: 'tael',
        price: 3000000,
        value: 400,
        tips: '水仙的种子，可在房屋内种植，收获时间400分钟。',
    },
    1516: {
        name: '薰衣草',
        value: 1,
        tips: '一株带着清香的薰衣草，赠送给好友可获得1点亲密度。',
    },
    1517: {
        name: '铃兰',
        value: 1,
        tips: '花悬若铃串，香气清雅如兰，故名铃兰，赠送给好友可获得1点亲密度。',
    },
    1518: {
        name: '蒲公英',
        value: 2,
        tips: '一种有趣的草，吹一口也许会有意外之喜，赠送给好友可获得2点亲密度',
    },
    1519: {
        name: '桔梗',
        value: 2,
        tips: '桔梗，即可入药，又可入食，赠送给好友可获得2点亲密度',
    },
    1520: {
        name: '风信子',
        value: 2,
        tips: '象征着生命的花，赠送给好友可获得2点亲密度。',
    },
    1521: {
        name: '蔷薇',
        value: 2,
        tips: '纯白的蔷薇，象征着单纯美好，赠送给好友可获得2点亲密度。',
    },
    1522: {
        name: '茉莉',
        value: 4,
        tips: '轻盈雅淡的茉莉，赠送给好友可获得4点亲密度。',
    },
    1523: {
        name: '山药',
        value: 4,
        tips: '俗名谩自呼山羊，佳口由来号玉延，赠送给好友可获得4点亲密度。',
    },
    1524: {
        name: '向日葵',
        value: 4,
        tips: '带着我勇敢地去追求自己想要的幸福吧，赠送给好友可获得4点亲密度。',
    },
    1525: {
        name: '丁香',
        value: 4,
        tips: '冷艳琼为色，低枝翠作围，赠送给好友可获得4点亲密度。',
    },
    1526: {
        name: '百合',
        value: 10,
        tips: '一种皎洁无疵、晶莹雅致、清香宜人的花，赠送给好友可获得10点亲密度。',
    },
    1527: {
        name: '牡丹',
        value: 10,
        tips: '唯有牡丹真国色，花开时节动京城，赠送给好友可获得10点亲密度。',
    },
    1528: {
        name: '玫瑰',
        value: 10,
        tips: '象征着美好爱情的花朵，赠送给好友可获得10点亲密度。',
    },
    1529: {
        name: '郁金香',
        value: 20,
        tips: '神秘而高贵的花朵，赠送给好友可获得20点亲密度。',
    },
    1530: {
        name: '水仙',
        value: 50,
        tips: '一株充满神秘色彩的花朵，传说它是水中神仙，亦为水葬者，赠送给好友可获得50点亲密度。',
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
            id
        }))
    }

}