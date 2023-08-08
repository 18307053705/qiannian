const { PetG, ErrorG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn, equipFn } = require("../../utils");
module.exports = {
    /**
     * 宠物卸下装备
     * @param {*} posKey 装备部位
     */
    petUnloadEquip: async function (req, res) {
        const { posKey } = req.body;
        if (!posKey) {
            ErrorG.paramsError(res);
            return;
        }
        // 获取宠物信息
        const { id:petId, equip: equip_pool, addition } = PetG.getPetGlobal(req) || {};
        if (!petId) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        const { id, ext } = equip_pool[posKey];
        const equipReward = {
            [id]: equip_pool[posKey]
        }
        const message = knapsackFn.addKnapsack(req, res, { article: { equipReward } });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        const equipWear = knapsackTable.getEquip(id);
        const { attr: deleteAttr } = equipFn.computeEquipAttr(equipWear, ext);
        // 更新卸下装备后的属性
        Object.keys(deleteAttr).forEach(key => {
            addition[key] -= deleteAttr[key];
        })
        // 需要进行卸下的装备
        delete equip_pool[posKey];
        // 更新宠物装备池
        PetG.updataPetGlobal(req, res, { equip: equip_pool, addition });
        res.send({
            code: 0,
            data: ''
        })

    },
}