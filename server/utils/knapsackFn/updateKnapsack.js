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
        // 否则直接更新sql
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = key === 'data' ? KnapsackG.saveSqlChang(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        const { results } = await res.asyncQuery(`update knapsack  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results;
    },
}