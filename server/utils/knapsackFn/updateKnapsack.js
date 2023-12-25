const { KnapsackSql } = require('@/mysql');
module.exports = {
    /**
     * 更新背包
     * @param {*} req 
     * @param {*} res
     * @param {*} data // 更新数据{data,yuanbao,teal}
     * @param {*} role_id // 更新其他人背包
     */
    updateKnapsack: async function (req, res, data, role_id) {
        // 判断该玩家是否在线
        if (KnapsackG.getknapsackGlobal(req, res, role_id)) {
            KnapsackG.updateknapsackGlobal(req, res, data, role_id);
            return;
        }
        const upData = {};
        Object.keys(data).forEach(key => {
            upData[key] = key === 'data' ? KnapsackG.saveSqlChang(data[key]) : data[key];
        })
        return KnapsackSql.asyncUpdateKnapsack(role_id, upData);
    },
}