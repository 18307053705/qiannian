const { knapsackTable } = require("@/table");
const { computeEquipAttr } = require("./computeEquipAttr");
const { computeSuitAttr } = require("./computeSuitAttr");
const { computeEquipPosKey } = require("./computeEquipPosKey");
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} equip 佩戴的装备信息{id,n,ext}
     * @param {*} pos 替换部位
     * @return {*} message 错误信息,存在即佩戴失败
     * @return {*} replaceEquip 替换下来的装备信息
     */
    wearEquip: function (req, res, equip) {
        const { equip_pool, role_attr, role_level, role_career } = RoleG.getRoleGlobal(req, res);
        const old_equip_pool = JSON.parse(JSON.stringify(equip_pool));
        const { id, name, ext } = equip;
        // 需要进行佩戴的装备
        const equipWear = knapsackTable.getArticle(id);
        // 判断等级是否满足
        if (equipWear.level > role_level) {
            return {
                message: `等级不足,无法该佩戴${name}`
            }
        }
        // 判断职业是否满足
        if (equipWear.career) {
            if (equipWear.career === 1 && !([1, 4, 7].includes(role_career))) {
                return { message: `职业不符合,无法该佩戴${name}` }
            }
            if (equipWear.career === 2 && !([2, 5, 8].includes(role_career))) {
                return { message: `职业不符合,无法该佩戴${name}` }
            }
            if (equipWear.career === 3 && !([3, 6, 9].includes(role_career))) {
                return { message: `职业不符合,无法该佩戴${name}` }
            }
        }

        const addAttr = computeEquipAttr(equipWear, ext);
        const posName = computeEquipPosKey(equipWear, equip_pool)
        // 替换装备
        const replaceEquip = equip_pool[posName];
        // 判断该部位是否替换装备
        if (replaceEquip) {
            replaceEquip.name = replaceEquip.n;
            // 增加唯一标识uid
            replaceEquip.uid = `${new Date() * 1}1`;
            replaceEquip.s = 1;
            delete replaceEquip.n;
            const deleteAttr = computeEquipAttr(knapsackTable.getArticle(replaceEquip.id), replaceEquip.ext);
            Object.keys(deleteAttr).forEach(key => {
                if (addAttr[key]) {
                    addAttr[key] -= deleteAttr[key];
                } else {
                    addAttr[key] = deleteAttr[key] * -1
                }
            })
        }
        // 更新装备
        equip_pool[posName] = {
            id,
            n: name,
            ext
        }
        if (equip.n) {
            equip_pool[posName]['n2'] = equip.n;
        }
        const { attrs, suit } = computeSuitAttr(equip_pool, old_equip_pool);
        // 更新套装信息
        equip_pool['suit'] = suit;
        // 更新佩戴装备后的属性
        const { addition } = role_attr;
        Object.keys(addAttr).forEach(key => {
            if (addition[key]) {
                addition[key] += addAttr[key];
            } else {
                addition[key] = addAttr[key];
            }
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
        return { replaceEquip }


    },
}