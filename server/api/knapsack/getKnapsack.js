const { knapsackFn } = require('../../utils');
module.exports = {
    /**
     * 获取背包信息
     */
    getKnapsack: async (req, res) => {
        const { type } = req.body;
        const { data = [], tael, yuanbao } = await knapsackFn.asyncGetKnapsack(req, res, { type });
        res.send({
            code: 0,
            data: {
                list: data,
                tael: tael,
                yuanbao: yuanbao
            }
        })
    }
};
