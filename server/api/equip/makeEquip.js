const { knapsackTable } = require('@/table');
const { equipFn, knapsackFn } = require('@/utils');

module.exports = {
    /**
     * 打造装备
     */
    makeEquip: (req, res) => {
        const { equipId, type } = req.body;
        if (!equipId) {
            ErrorG.paramsError(res);
            return;
        }
        const { data, yuanbao } = KnapsackG.getknapsackGlobal(req, res);

        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理！'
            })
            return;
        }
        const { name: equipName, ...equip } = knapsackTable.getArticle(equipId);
        const getMakeInfo = equipFn.getMakeInfo(equip);
        //  不可打造的装备
        if (!getMakeInfo) {
            res.send({
                code: 0,
                message: `非法打造${equipName}`
            })
            return;
        }
        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const { integral, yuanbao: yuanbaoVal, article } = getMakeInfo;
        const { key, value, name } = integral;
        // 材料打造
        if (type === 1) {
            // 判断声望
            if (role_integral[key] < value) {
                res.send({
                    code: 0,
                    message: `打造失败,${name}不足${value}。`
                })
                return;
            }
            // 判断材料
            const { message } = knapsackFn.deleteKnapsack(req, res, article);
            if (message) {
                res.send({
                    code: 0,
                    message: `打造失败,${message}。`
                })
                return;
            }
        };

        // 元宝打造
        if (type === 2 && yuanbao < yuanbaoVal) {
            res.send({
                code: 0,
                message: `打造失败,元宝不足${yuanbaoVal}。`
            })
            return;
        }

        // --------开始打造----------------
        if (type === 1) {
            // 消耗声望
            role_integral[key] -= value;
            // 材料已经在条件检测中消耗
            RoleG.updataRoleGlobal(req, res, { role_integral });
        }

        if (type === 2) {
            // 消耗元宝
            KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - yuanbaoVal });
        }
        knapsackFn.addKnapsack(req, res, { [equipId]: { name: equipName, id: equipId } }, { force: true });
        res.send({
            code: 0,
            data: '',
            success: `${equipName},打造成功。`
        })
    }
};
