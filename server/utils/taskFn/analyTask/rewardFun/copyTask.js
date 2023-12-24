const knapsackTable = require('@/table/knapsack');
// 随机物品
function getArticle(list, config) {
    const { rate = 49, maxNum = 5, minNum = 1 } = config || {};
    const data = {};
    list.forEach((ids) => {
        if (Math.floor(Math.random() * 100) > rate) {
            const s = Math.floor(Math.random() * maxNum) + minNum;
            const { id, name } = knapsackTable.getArticle(ids);
            data[id] = {
                id,
                name,
                s
            }
        }
    });
    return data;
}

module.exports = {
    // 炼魂洞
    lianHunDong: function () {
        return {
            exp: 50000,
            world: 100,
            tael: 20000,
            yuanbao: 50,
            article: getArticle([1861, 1865, 1869, 1873, 1877, 1881, 1885]),
        }
    },
    // 黑角域
    heiJiaoYu: function (req, res) {
        return {
            attr: "exp-200000,world-200",
            tael: 50000,
            yuanbao: 50,
            // article: getArticle([118, 122, 126, 130, 134, 138, 142], { minNum: 2, maxNum: 7 }),
            hide: true
        }
    },

}
