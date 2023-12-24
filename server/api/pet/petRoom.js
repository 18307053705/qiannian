const { knapsackTable } = require("@/table");
const { knapsackFn } = require('@/utils');

module.exports = {
    /**
     * 增加宠物房
     * @param {*} req.petId
     */
    petRoom: async function (req, res) {
        const { pet_pool } = RoleG.getRoleGlobal(req, res);
        if (pet_pool.x >= 20) {
            res.send({
                code: 0,
                message: '宠物房无法继续扩张。'
            })
            return;
        }
        
        const article = {
            183: {
                ...knapsackTable.getArticle(183),
                s: 1
            },
        }
        const { message } = knapsackFn.deleteKnapsack(req, res, article)
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        pet_pool.x += 1;
        RoleG.updataRoleGlobal(req, res, { pet_pool });
        res.send({
            code: 0,
            data: '消耗宠物扩房卷,成功扩张。'
        })
    }
}
