const knapsackTable = require('@/table/knapsack');
// 随机物品
function getArticle(stone, list, config) {
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

    stone.forEach((ids)=>{
        if (Math.floor(Math.random() * 100) > 50) {
            const s = Math.floor(Math.random() * 2) + 1;
            const { id, name } = knapsackTable.getArticle(ids);
            data[id] = {
                id,
                name,
                s
            }
        }
    })

    return data;
}

module.exports = {
    // 炼魂洞
    LianHunDong: function () {
        return {
            exp: 37500,
            world: 100,
            tael: 20000,
            yuanbao: 10,
            article: getArticle([1849, 1853, 1857], [1861, 1865, 1869, 1873, 1877, 1881, 1885]),
        }
    },
    // 黑炎宗
    heiYanZong: function (req, res) {
        return {
            exp: 125000,
            world: 120,
            tael: 50000,
            yuanbao: 15,
            article: getArticle([1849, 1853, 1857], [1861, 1865, 1869, 1873, 1877, 1881, 1885], { minNum: 2, maxNum: 7 }),
        }
    },
    // 四海龙宫
    SiHaiLongGong: function (req, res) {
        return {
            exp: 640000,
            world: 150,
            tael: 50000,
            yuanbao: 20,
            article: getArticle([1850, 1854, 1858], [1862, 1866, 1870, 1874, 1878, 1882, 1886]),
        }
    },
    // 凤凰桐木
    FengHuangTongMu: function (req, res) {
        return {
            exp: 1500000,
            world: 150,
            tael: 50000,
            yuanbao: 25,
            article: getArticle([1850, 1854, 1858], [1862, 1866, 1870, 1874, 1878, 1882, 1886], { minNum: 2, maxNum: 7 }),
        }
    },
    // 血魔老祖
    XueMoLaoZu: function (req, res) {
        return {
            exp: 2000000,
            world: 180,
            tael: 50000,
            yuanbao: 30,
            article: getArticle([1851, 1855, 1859], [1863, 1867, 1871, 1875, 1879, 1883, 1887]),
        }
    },
    // 海底魔宫
    HaiDiMoGong: function (req, res) {
        return {
            exp: 5000000,
            world: 180,
            tael: 50000,
            yuanbao: 35,
            article: getArticle([1852, 1856, 1860], [1864, 1868, 1872, 1876, 1880, 1884, 1888], { minNum: 2, maxNum: 5 }),
        }
    },
    // 天魔传说
    TianMoChuanShuo: function (req, res) {
        return {
            exp: 7000000,
            world: 200,
            tael: 50000,
            yuanbao: 40,
            article: getArticle([], [18100], { minNum: 1, maxNum: 2 }),
        }
    },
    // 地府传说
    DiFuChuanShuo: function (req, res) {
        return {
            exp: 9000000,
            world: 300,
            tael: 50000,
            yuanbao: 50,
            article: getArticle([], [18101], { minNum: 1, maxNum: 2 }),
        }
    },
    // 魔族遗迹
    MoZuYiJi: function (req, res) {
        return {
            exp: 10000000,
            world: 300,
            tael: 50000,
            yuanbao: 50,
            article: getArticle([], [18101], { minNum: 1, maxNum: 2 }),
        }
    },
}
