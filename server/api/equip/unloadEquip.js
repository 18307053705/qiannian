const { knapsackFn, equipFn } = require('@/utils');
const { knapsackTable } = require('@/table');
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
        const old_equip_pool = JSON.parse(JSON.stringify(equip_pool));
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 对应部位装备
        const equip = equip_pool[pos];
        let message = '未找到装备';
        if (equip) {
            delete equip_pool[pos];
            const { id, ext, n2 } = equip;
            // 背包增加物品
            const article = {
                [id]: {
                    id,
                    name: equip.n,
                    n: n2,
                    ext
                }
            }
            message = knapsackFn.addKnapsack(req, res, article, { data })
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            const { attrs, suit } = equipFn.computeSuitAttr(equip_pool, old_equip_pool);
            // 更新套装信息
            equip_pool['suit'] = suit;
            // 计算属性
            const attr = equipFn.computeEquipAttr(knapsackTable.getArticle(id), ext);
            const { addition } = role_attr;
            Object.keys(attr).forEach(key => {
                addition[key] -= attr[key];
            })
            // 套装属性
            Object.keys(attrs).forEach(key => {
                if (addition[key]) {
                    addition[key] += attrs[key];
                } else {
                    addition[key] = attrs[key];
                }
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
