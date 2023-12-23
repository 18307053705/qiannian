const { PetG } = require("../../global");
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
        const { id: petId, equip: equip_pool, level, addition, type } = PetG.getPetGlobal(req) || {};
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
        const { id, name, ext } = equip;
        const equipWear = knapsackTable.getArticle(id);
        // 判断等级是否满足
        if (equipWear.level > level) {
            res.send({
                code: 0,
                message: `宠物等级不足,无法该佩戴${name}`
            })
            return;
        }
        // 判断职业是否满足
        if (equipWear.career !== type && equipWear.career) {
            res.send({
                code: 0,
                message: `宠物职业不符合,无法该佩戴${name}`
            })
            return;
        }
        const old_equip_pool = JSON.parse(JSON.stringify(equip_pool));
        const { attr: addAttr } = equipFn.computeEquipAttr(equipWear, ext);
        // 替换下装备
        let replaceEquip = equip_pool[posKey];
        // 判断该部位是否替换装备
        if (replaceEquip) {
            const { id, ext, n } = replaceEquip;
            const { attr: deleteAttr } = equipFn.computeEquipAttr(knapsackTable.getArticle(id), ext, posKey);
            Object.keys(deleteAttr).forEach(key => {
                if (addAttr[key]) {
                    addAttr[key] -= deleteAttr[key];
                } else {
                    addAttr[key] = deleteAttr[key] * -1
                }
            })
            data[in_x] = {
                id,
                ext,
                name: n,
                s: 1
            };
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
            n: name,
            ext
        }
        if (equip.n) {
            equip_pool[posKey]['n2'] = equip.n;
        }
        const { attrs, suit } = equipFn.computeSuitAttr(equip_pool, old_equip_pool);
        // 更新套装信息
        equip_pool['suit'] = suit;
        // 套装属性
        Object.keys(attrs).forEach(key => {
            if (addition[key]) {
                addition[key] += attrs[key];
            } else {
                addition[key] = attrs[key];
            }
        })
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