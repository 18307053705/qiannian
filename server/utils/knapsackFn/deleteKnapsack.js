const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 消耗物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} article 必传{id:{s:数量,id,name:名称,in_x:下标可选}}
     * @param {*} data 可选
     * @returns {string}  message 
     * @returns {string}  success 消耗的物品信息 
     * @returns {string}  data 更新后的物品列表
     * @returns {string}  delInx 消耗到0被删除的物品下标
     */
    deleteKnapsack: function (req, res, article, list) {
        if (!article) {
            return undefined;
        }
        const { data } = list ? { data: list } : KnapsackG.getknapsackGlobal(req, res);
        const chengData = [];
        const delInx = [];
        const message = [];
        const success = [];
        data.forEach(({ id, name, s }, index) => {
            const itme = data[index];
            const { in_x = index, ...drain } = article[id] || { in_x: -1 };
            // 是否存在物品，且下标对应
            if (in_x === index && s >= drain['s']) {
                success.push(`消耗${name}x${drain['s']}`);
                const num = s - drain['s'];
                delete article[id];
                if (num > 0) {
                    chengData.push({
                        ...itme,
                        s: num
                    });
                } else {
                    delInx.push(index);
                }
                return;
            }
            chengData.push(itme)
        })
        if (JSON.stringify(article) !== '{}') {
            Object.values(article).forEach(({ name, id }) => {
                message.push(`${name || knapsackTable.getDataName(id)}数量不足`);
            })
        } else {
            KnapsackG.updateknapsackGlobal(req, res, { data: chengData });
        }
        return {
            message: message.join(','),
            data: chengData,
            delInx,
            success: success.join(','),
        };
    },

}