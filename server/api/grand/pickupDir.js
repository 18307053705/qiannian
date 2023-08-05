const { knapsackFn } = require('../../utils');
const { GrandG, KnapsackG } = require('../../global');

module.exports = {
    /**
     * 拾取物品
     * @param {string} in_x 下标
     */
    pickupDir: async (req, res) => {
        const { in_x = 0 } = req.body;
        const { address } = GrandG.getDirGlobal(req, res);
        const { articleEle } = GrandG.getGrandEleGlobal(req, res, address);
        const itme = articleEle[in_x];
        if (!itme) {
            res.send({
                code: 0,
                message: '你捡取的物品不存在'
            })
            return;
        }
        const artReward = {
            [itme.id]: itme
        }
        const message = knapsackFn.addKnapsack(req, res, { article: { artReward } });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        GrandG.deteleGrandEleGlobal(req, res, in_x);


        res.send({
            code: 0,
            success: `你捡起[${itme.n}]x${itme.s}`
        })

    }
};