const { KnapsackG } = require("../../global");

module.exports = {
    /**
     * 消耗物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.article 必传{id:{p|type:类型,s:数量,n:名称}}
     * @param {*} data.data 可选
     * @returns {string}  message 
     * @returns {string}  data 更新后的物品列表
     * @returns {string}  delInx 消耗到0被删除的物品下标
     */
    deleteKnapsack: function (req, res, { article, data: list }) {
        if (!article) {
            return undefined;
        }
        const { data } = list ? { data: list } : KnapsackG.getknapsackGlobal(req, res);
        let chengData = [];
        let message = [];
        let delInx = [];
        data.forEach(({ id, p, s, ...itme }, index) => {
            const articleItme = article[id];
            if (articleItme && (p === articleItme['p'] || p === articleItme['type'])) {
                let num = s - articleItme['s'];
                num >= 0 && delete article[id];
                if (num > 0) {
                    chengData.push({
                        ...itme,
                        id,
                        p,
                        s: num
                    });
                } else {
                    delInx.push(index);
                }

                return;
            }
            chengData.push({
                id,
                p,
                s,
                ...itme
            })

        })
        if (JSON.stringify(article) !== '{}') {
            Object.keys(article).forEach((key) => {
                const { n } = article[key];
                message.push(`${n}数量不足`);
            })
        } else {
            KnapsackG.updateknapsackGlobal(req, res, { data: chengData });
        }
        return {
            message: message.join(','),
            data: chengData,
            delInx
        };
    },

}