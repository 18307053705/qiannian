const { ErrorG, PetG } = require('../../global');
const { ruleFn } = require('../../utils');
module.exports = {
    /**
     * 装备重命名
     * @param pos 装备部位
     * @param name 名称
     */
    renameEquip: async (req, res) => {
        const { name, pos } = req.body;
        if (!pos || !name) {
            ErrorG.paramsError(res);
            return;
        }
        // 校验名字是否合法
        if (!ruleFn.checkNameRule(res, name)) {
            return;
        }
        const { id, equip: equip_pool } = PetG.getPetGlobal(req) || {};
        if (!id) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        const equip = equip_pool[pos];
        if (!equip) {
            res.send({
                code: 0,
                message: "装备信息有误"
            })
            return;
        }
        const { ext } = equip;
        const [firm, forge] = ext.split('_');
        let message = '';
        let success = '';
        if (firm == 16 && forge == 50) {
            equip['n'] = name;
            equip['n2'] = name;
            success = '装备改名成功.';
            PetG.updataPetGlobal(req, res, { equip: equip_pool });
        } else {
            message = '不满足改名条件。'
        }
        res.send({
            code: 0,
            data: name,
            message,
            success
        })
    }
};
