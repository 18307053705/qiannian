const { ErrorG, RoleG } = require('../../global');
const { knapsackTable, EffectTable } = require('../../table');
const { knapsackFn } = require('../../utils');


const materialIds = [148, 149, 1410, 1411, 1412, 1413, 1414];
module.exports = {
    /**
     * 房屋家具镶嵌
     * @param {*} req.id 家具id
     * @param {*} res 
     */
    mosaic: function (req, res) {
        const { id } = req.body;
        const index = materialIds.indexOf(id);
        if (index === -1) {
            ErrorG.paramsError(res);
            return;
        }
        const { treasure_pool } = RoleG.getRoleGlobal(req, res);
        const { ext } = treasure_pool.fw;
        const extList = ext.split('_');
        if (extList[index] > 9) {
            res.send({
                code: 0,
                message: '家具已摆放最大,无法继续摆放。'
            })
            return;
        }
        const { name, value } = knapsackTable.getArticle(id);
        let result = knapsackFn.deleteKnapsack(req, res, { [id]: { id, name, s: 1 } })

        if (!result.message) {
            result = EffectTable.group1Fn(req, res, value)
        }
        // EffectTable会改变全局房屋信息,所有需要拉取最新房屋信息
        const { treasure_pool: treasure } = RoleG.getRoleGlobal(req, res);
        extList[index] = extList[index] - 0 + 1;
        treasure.fw.ext = extList.join('_');
        RoleG.updataRoleGlobal(req, res, { treasure_pool: treasure });
        res.send({
            code: 0,
            message: result.message
        })
    }
}