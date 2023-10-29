const { ErrorG, KnapsackG, RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { equipFn, knapsackFn } = require('../../utils');

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
        if (data.lenght >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理！'
            })
            return;
        }
        const equip = knapsackTable.getEquip(equipId);
        const getMakeInfo = equipFn.getMakeInfo(equip);
        //  不可打造的装备
        if (!getMakeInfo) {
            res.send({
                code: 0,
                message: `非法打造${equip.name}`
            })
            return;
        }
        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const { integral, yuanbao: yuanbaoVal, article } = getMakeInfo;
        // 元宝打造
        if (type === 2) {
            if (yuanbao < yuanbaoVal) {
                res.send({
                    code: 0,
                    message: `打造失败,元宝不足${yuanbaoVal}。`
                })
                return;
            }

            const equipReward = {
                [equipId]: {
                    n: equip.name,
                    id: equipId,
                    s: 1,
                    p: 3
                }
            }
            knapsackFn.addKnapsack(req, res, { article: { equipReward } });
            res.send({
                code: 0,
                data: '',
                success: `${equip.name},打造成功。`
            })
            return;
        }
        // 材料打造
        const { key, value, name } = integral;
        if (role_integral[key] < value) {
            res.send({
                code: 0,
                message: `打造失败,${name}不足${value}。`
            })
            return;
        };
        const { message } = knapsackFn.deleteKnapsack(req, res, { article })
        if (message) {
            res.send({
                code: 0,
                message: `打造失败,${message}。`
            })
            return;
        }
        const equipReward = {
            [equipId]: {
                n: equip.name,
                id: equipId,
                s: 1,
                p: 3
            }
        }
        role_integral[key] -= value;
        knapsackFn.addKnapsack(req, res, { article: { equipReward } })
        RoleG.updataRoleGlobal(req, res, { role_integral });
        res.send({
            code: 0,
            data: '',
            success: `${equip.name},打造成功。`
        })
    }
};
