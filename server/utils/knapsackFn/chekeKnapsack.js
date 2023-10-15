
const { getKnapsackInfo } = require('./getKnapsackInfo');
const { KnapsackG } = require('../../global');
module.exports = {
    /**
     * 校验背包物品信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} article {id:{id,p,s,n}}
     * @param {*} role_id 目标id,默认自身
     * @returns exist 存在物品信息{id:{id,p,s,n}}
     * @returns result true:通过
     */
    chekeKnapsack: function (req, res, article, role_id) {
        const articles = JSON.parse(JSON.stringify(article));
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const exist = {};
        const length = data.length;
        for (let i = 0; i < length; i++) {
            const { id, p, n, s } = data[i];
            const itme = articles[id];
            if (itme && itme.p === p) {
                exist[id] = {
                    ...itme,
                    c: s,
                };
                // 判断数量是否足够
                s >= itme.s && delete articles[id];
            }
            if (JSON.stringify(articles) === '{}') {
                i = length;
            }
        }
        // 可能某物品直接不存在
        if (JSON.stringify(articles) !== '{}') {
            Object.keys(articles).forEach((itme) => {
                if (!exist[itme.id]) {
                    exist[itme.id] = {
                        ...itme,
                        c: 0,
                    };
                }
            })
        }
        return {
            exist,
            result: JSON.stringify(articles) === '{}'
        };
    }
}