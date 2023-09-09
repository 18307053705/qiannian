const { getRoleInfo, updataRoleInfo } = require('../roleFn');
const { RoleG } = require("../../global");
const ADD_ATTR = {
    life_max: 100,
    life: 100,
    mana_max: 80,
    mana: 80,
    atk_max: 10,
    atk_min: 8,
    dfs_max: 6,
    dfs_min: 4,
    hit: 2,
    dodge: 1,
    sudden: 1,
}


function addAttr(attr) {
    const { addition } = attr;
    Object.keys(ADD_ATTR).forEach((key) => {
        addition[key] += ADD_ATTR[key];
    });
    return attr;
}

function delAttr(attr, level) {
    const { addition } = attr;
    Object.keys(ADD_ATTR).forEach((key) => {
        addition[key] -= ADD_ATTR[key] * level;
    });
    return attr;
}

module.exports = {
    /**
     * 姻缘树属性
     * @param {*} req 
     * @param {*} res 
     * @param {*} level 存在代表删除额外属性，反之增加
     */
    terrAttr: async function (req, res, level) {
        const { qingyuan, role_attr } = RoleG.getRoleGlobal(req, res);
        const { d } = qingyuan;
        const { role_attr: TRoleAttr } = await getRoleInfo(req, res, { role_id: d.rId });
        if (level) {
            addAttr(role_attr);
            addAttr(TRoleAttr);
        } else {
            delAttr(role_attr, level);
            delAttr(TRoleAttr, level);
        }
        RoleG.updataRoleGlobal(req, res, { role_attr });
        await updataRoleInfo(req, res, { role_attr: TRoleAttr }, d.rId);
    }
}