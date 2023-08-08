const { RoleG, ErrorG } = require("../../global");
const { knapsackTable } = require("../../table");
const { petFn, knapsackFn, equipFn } = require("../../utils");
module.exports = {
    /**
     * 宠物卸下装备
     * @param {*} posKey 装备部位
     * @param petId 宠物id
     */
    petUnloadEquip: async function (req, res) {
        const { posKey } = req.body;
        if (!posKey || !petId) {
            ErrorG.paramsError(res);
            return;
        }
        const { pet_pool } = RoleG.getRoleGlobal(req, res);
        const pet = pet_pool.l.find(({ id }) => id === petId);
        if (!pet) {
            res.send({
                code: 0,
                message: '宠物信息有误'
            })
            return;
        }

        // 获取宠物信息
        const { equip: equip_pool, addition } = await petFn.getPetInfo(req, res, petId);
        const { id, n, ext } = equip_pool[posKey];
        const artReward = {
            [id]: { id, n, p: 3, s: 1 }
        }
        const message = knapsackFn.addKnapsack(req, res, { article: { artReward } });
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
        petFn.updataPetInfo(req, res, { equip: equip_pool, addition }, petId);


    },
}