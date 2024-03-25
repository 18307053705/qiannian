const { computeEquipAttr } = require('./computeEquipAttr');
module.exports = {
    /**
     * 计算两件装备的属性并重新给角色赋值
     * @param {*} _equip 原来装备
     * @param {*} equip  改变后的装备
     */
    commputeEqipAttrRole: function (_equip, equip) {
        const { role_attr } = RoleG.getRoleGlobal(req, res);
        const _attr = computeEquipAttr(_equip, _equip.ext);
        const attr = computeEquipAttr(equip, equip.ext);
        // 更新佩戴装备后的属性
        const { addition } = role_attr;
        Object.keys(addition).forEach(key => {
            addition[key] += attr[key] - _attr[key];
        })
        RoleG.updataRoleGlobal(req, res, { role_attr });
    }
}