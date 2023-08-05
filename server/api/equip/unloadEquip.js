const { KnapsackG, ErrorG, RoleG } = require('../../global');
const { knapsackFn, equipFn } = require('../../utils');
const { knapsackTable } = require('../../table');
module.exports = {
    /**
     * 卸下装备
     * @param pos 装备部位
     */
    unloadEquip: (req, res) => {
        const { pos } = req.body;
        if (!pos) {
            ErrorG.paramsError(res);
            return;
        }
        const { equip_pool, role_attr } = RoleG.getRoleGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 对应部位装备
        const equip = equip_pool[pos];
        let message = '未找到装备';
        if (equip) {
            delete equip_pool[pos];
            const { id, ext } = equip;
            // 背包增加物品
            const article = { equipReward: { [id]: equip } }
            message = knapsackFn.addKnapsack(req, res, { article, data })
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }

            // 计算属性
            const { attr } = equipFn.computeEquipAttr(knapsackTable.getEquip(id), ext);
            const { addition } = role_attr;
            Object.keys(attr).forEach(key => {
                addition[key] -= attr[key];
            })
            RoleG.updataRoleGlobal(req, res, { equip_pool, role_attr });
        }
        res.send({
            code: 0,
            data: '',
            message
        })
    }
};
