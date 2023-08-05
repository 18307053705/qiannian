const { ErrorG, RoleG } = require('../../global');
const { ruleFn } = require('../../utils');
module.exports = {
    /**
     * 装备重命名
     * @param pos 装备部位
     * @param name 名称
     */
    renameEquip: (req, res) => {
        const { name, pos } = req.body;
        if (!pos || !name) {
            ErrorG.paramsError(res);
            return;
        }
        // 校验名字是否合法
        if (!ruleFn.checkNameRule(res, name)) {
            return;
        }
        const { equip_pool } = RoleG.getRoleGlobal(req, res);
        const equip = equip_pool[pos];
        if (!equip) {
            res.send({
                code: 0,
                message: "装备信息有误"
            })
        }
        const { ext } = equip;
        const [firm, forge] = ext.split('_');
        let message = '';
        let success = '';
        if (firm == 16 && forge == 50) {
            equip['n'] = name;
            equip['n2'] = name;
            success = '装备改名成功.';
            RoleG.updataRoleGlobal(req, res, { equip_pool })
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
