
const { ErrorG } = require('../../global');
const { roleFn, knapsackFn, shopFn, petFn, equipFn } = require('../../utils');
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 获取物品详情
     * @param form 物品所在1:背包,2:身上,3,:仓库4:店铺,5:商城,6:宠物
     * @param in_x 所在下标(背包,仓库,店铺)
     * @param pos 装备部位(身上,宠物)
     * @param id 物品id商城
     * @param role_id 角色id
     * @param petId 宠物id
     *
     */
    getArticleDetail: async function (req, res) {
        const { form, in_x, pos, role_id, petId, id } = req.body;
        // 背包 仓库 店铺 必传下标
        if ([1, 3, 4].includes(form) && in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        // 商城 必传物品id
        if (form === 5 && !id) {
            ErrorG.paramsError(res);
            return;
        }
        // 身上,宠物 必传部位
        if ([2, 6].includes(form) && !pos) {
            ErrorG.paramsError(res);
            return;
        }
        // 宠物 必传宠物id
        if (form === 6 && !petId) {
            ErrorG.paramsError(res);
            return;
        }
        let articleInfo = undefined;
        // 物品在背包
        if (form === 1) {
            const { data } = await knapsackFn.getKnapsackInfo(req, res, { role_id });
            articleInfo = data[in_x];
        }
        // 物品在身上(已穿戴装备)
        if (form === 2) {
            const { equip_pool } = await roleFn.getRoleInfo(req, res, { role_id });
            // 对应部位装备
            const equip = equip_pool[pos];
            articleInfo = { ...equip, p: 3 };
        }
        // 物品在仓库
        if (form === 3) {
            const { data } = await knapsackFn.getKnapsackInfo(req, res, { type: 3 });
            articleInfo = data[in_x];
        }
        // 物品在店铺：自身店铺与其他人店铺(t_roleId)
        if (form === 4) {
            const { article } = await shopFn.getShopInfo(req, res, role_id);
            articleInfo = article ? article[in_x] : undefined;
        }
        // 商城
        if (form === 5) {
            articleInfo = knapsackTable.getArticle(id);
        }
        // 宠物身上
        if (form === 5) {
            const { equip: petEquip } = await petFn.getPetInfo(req, res, petId);
            const equip = petEquip[pos];
            articleInfo = { ...equip, p: 3 };
        }
        if (articleInfo) {
            const { p, id, ext } = articleInfo;
            let data = undefined;
            if (p === 3) {
                data = equipFn.getEquipInfo(id, ext);
            } else {
                data = knapsackTable.getArticle(id);
            }
            res.send({
                code: 0,
                data: {
                    ...data,
                    ...articleInfo,
                }
            })
        }
    }
}