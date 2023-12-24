const { roleFn, knapsackFn, shopFn, petFn, equipFn } = require('@/utils');
const { knapsackTable } = require('@/table');

module.exports = {
    /**
     * 获取物品详情
     * @param form 物品所在1:背包,2:身上,3,:仓库4:店铺,5:商城,6:宠物，7积分商店
     * @param uid 所在下标(背包,仓库,店铺)
     * @param pos 装备部位(身上,宠物)
     * @param id 物品id
     * @param role_id 角色id
     * @param petId 宠物id
     */
    getArticleDetail: async function (req, res) {
        const { form, pos, role_id, petId, id, uid } = req.body;
          // 背包 仓库 店铺 必传uid
        if ([1, 3, 4].includes(form) && !uid) {
            ErrorG.paramsError(res);
            return;
        }
        // 商城与积分商店 必传id与类型
        if ((form === 5 || form === 7) && !id) {
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
            const { data } = await knapsackFn.asyncGetKnapsack(req, res, { role_id });
            const in_x = data.findIndex((itme) => itme.uid === uid);
            articleInfo = data[in_x];
        }
        // 物品在身上(已穿戴装备)
        if (form === 2) {
            const { equip_pool } = await roleFn.asyncGetRoleInfo(req, res, role_id);
            // 对应部位装备
            const equip = equip_pool[pos];
            articleInfo = { ...equip, p: 3 };
        }
        // 物品在仓库
        if (form === 3) {
            const { data } = await knapsackFn.asyncGetKnapsack(req, res, { type: 3 });
            const in_x = data.findIndex((itme) => itme.uid === uid);
            articleInfo = data[in_x];
        }
        // 物品在店铺：自身店铺与其他人店铺(t_roleId)
        if (form === 4) {
            const { article = [] } = await shopFn.asyncGetShopInfo(req, res, role_id) || {};
            const in_x = article.findIndex((itme) => itme.uid === uid);
            articleInfo = article ? article[in_x] : undefined;
        }
        // 商城 积分商店
        if (form === 5 || form === 7) {
            articleInfo = knapsackTable.getArticle(id);
        }
        // 宠物身上
        if (form === 6) {
            const { equip: petEquip } = await petFn.getPetInfo(req, res, petId);
            const equip = petEquip[pos];
            articleInfo = equip;
        }

        if (articleInfo) {
            const { id, ext } = articleInfo;
            let data = undefined;
            if (knapsackTable.isEquip(id)) {
                let exts = form === 7 ? '16_50_9_0_0_0_0_0_0' : (ext || KnapsackG.EQUIP_INIT_EXT);
                data = equipFn.getEquipInfo(id, exts);
                data.ext = exts;
            } else {
                data = knapsackTable.getArticle(id);
            }
            res.send({
                code: 0,
                data: {
                    ...articleInfo,
                    ...data,
                }
            })
        }
    }
}