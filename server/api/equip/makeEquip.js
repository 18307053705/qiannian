const { ErrorG, KnapsackG, RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { equipFn, knapsackFn } = require('../../utils');

const MAKE_MEUN = {
    1: 'world',
    2: 'exploit',
    3: 'gang',
    4: '',
}
const MAKE_TEXT_MEUN = {
    1: '世界声望',
    2: '世界功勋',
    3: '帮会声望'
}

module.exports = {
    /**
     * 打造装备
     */
    makeEquip: (req, res) => {
        const { equipId } = req.body;
        if (!equipId) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
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
                message: `非法打造`
            })
            return;
        }
        const { materiaInfo, makeNum, make } = getMakeInfo;

        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const integralKey = MAKE_MEUN[make];
        let integral = role_integral[integralKey];
        if (makeNum && integral < makeNum) {
            res.send({
                code: 0,
                message: `打造失败,${MAKE_TEXT_MEUN[make]}不足${makeNum}。`
            })
            return;
        } else {
            role_integral[integralKey] = integral - makeNum;
        }
        const { message } = knapsackFn.deleteKnapsack(req, res, { article: materiaInfo })
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
        knapsackFn.addKnapsack(req, res, { article: { equipReward } })
        RoleG.updataRoleGlobal(req, res, { role_integral });
        res.send({
            code: 0,
            data: '',
            success: `${equip.name},打造成功。`
        })
    }
};
