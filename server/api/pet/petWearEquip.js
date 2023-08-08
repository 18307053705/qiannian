const { ErrorG, KnapsackG, PetG } = require("../../global");
const { knapsackTable } = require("../../table");
const { equipFn } = require("../../utils");
module.exports = {
    /**
     * 宠物佩戴装备
     * @param {*} posKey 装备部位
     * @param in_x 背包所在下标(背包,仓库,店铺)
     */
    petWearEquip: async function (req, res) {
        const { posKey, in_x } = req.body;
        if (!posKey || in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        // 获取宠物信息
        const { id:petId, equip: equip_pool, level, addition, type } = PetG.getPetGlobal(req) || {};
        if (!petId) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const equip = data[in_x];
        if (!equip) {
            res.send({
                code: 0,
                message: '装备信息有误'
            })
            return;
        }

        // 需要进行佩戴的装备
        const { id, n, ext } = equip;
        const equipWear = knapsackTable.getEquip(id);
        // 判断等级是否满足
        if (equipWear.level > level) {
            res.send({
                code: 0,
                message: `宠物等级不足,无法该佩戴${n}`
            })
            return;
        }
        // 判断职业是否满足
        if (equipWear.career !== type && equipWear.career) {
            res.send({
                code: 0,
                message: `宠物职业不符合,无法该佩戴${n}`
            })
            return;
        }

        const { attr: addAttr } = equipFn.computeEquipAttr(equipWear, ext);
        // 替换下装备
        let replaceEquip = equip_pool[posKey];
        // 判断该部位是否替换装备
        if (replaceEquip) {
            const { attr: deleteAttr } = equipFn.computeEquipAttr(knapsackTable.getEquip(replaceEquip.id), replaceEquip.ext, posKey);
            Object.keys(deleteAttr).forEach(key => {
                if (addAttr[key]) {
                    addAttr[key] -= deleteAttr[key];
                } else {
                    addAttr[key] = deleteAttr[key] * -1
                }
            })
            // 物品类型标记为装备
            replaceEquip.p = 3;
            data[in_x] = replaceEquip;
        } else {
            data.splice(in_x, 1)
        }
        // 更新佩戴装备后的属性
        Object.keys(addAttr).forEach(key => {
            if (addition[key]) {
                addition[key] += addAttr[key];
            } else {
                addition[key] = addAttr[key];
            }
        })
        equip_pool[posKey] = {
            id,
            n,
            ext
        }
        // 更新宠物装备池
        PetG.updataPetGlobal(req, res, { equip: equip_pool, addition });
        // 更新背包
        KnapsackG.updateknapsackGlobal(req, res, { data });
        res.send({
            code: 0,
            data: ''
        })

    },
}