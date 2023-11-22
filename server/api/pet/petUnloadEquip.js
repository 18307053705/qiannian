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
        const { id: petId, equip: equip_pool, addition } = PetG.getPetGlobal(req) || {};
        const old_equip_pool = JSON.parse(JSON.stringify(equip_pool));
        if (!petId) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        const { id, ext, n, n2 } = equip_pool[posKey];
        const article = {
            [id]: { id, ext, name: n, n: n2, }
        }
        const message = knapsackFn.addKnapsack(req, res, article);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        const equipWear = knapsackTable.getArticle(id);
        const { attr: deleteAttr } = equipFn.computeEquipAttr(equipWear, ext);
        // 更新卸下装备后的属性
        Object.keys(deleteAttr).forEach(key => {
            addition[key] -= deleteAttr[key];
        })
        // 需要进行卸下的装备
        delete equip_pool[posKey];
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
        res.send({
            code: 0,
            data: ''
        })

    },
}