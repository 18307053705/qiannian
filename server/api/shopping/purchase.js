const { ErrorG, KnapsackG, RoleG } = require("../../global");
const { shopFn, knapsackFn, roleFn } = require("../../utils");

module.exports = {
    /**
     * 购买物品
     * @param {*} req.role_id 店铺玩家id
     * @param {*} req.type (1:物品,2:宠物)
     * @param {*} req.s 数量
     * @param {*} req.uid  物品所在货架下标
     * @param {*} req.petId  宠物id
     */
    purchase: async function (req, res) {
        const { type, uid, s = 1, role_id, petId } = req.body;
        if (!type || !role_id) {
            ErrorG.paramsError(res);
            return;
        }
        // 购买物品参数校验
        if (type === 1 && !uid && !s) {
            ErrorG.paramsError(res);
            return;
        }
        // 购买宠物参数校验
        if (type === 2 && !petId) {
            ErrorG.paramsError(res);
            return;
        }
        // 获取店主店铺信息
        const { article, petList } = await shopFn.asyncGetShopInfo(req, res, role_id);
        // 获取背包内货币
        let { tael, yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        // 购买物品
        if (type === 1) {
            const in_x = article.findIndex((itme) => itme.uid === uid);
            const durg = article[in_x];
            // 校验物品或者数量是否足够
            if (!durg || durg.s < s) {
                res.send({
                    code: 0,
                    message: '购买物品信息有误'
                })
                return;
            }
            // 判断金钱是否足够
            const { price, unit } = durg;
            const prices = s * price;
            if (unit === 'yuanbao' && yuanbao < prices) {
                res.send({
                    code: 0,
                    message: '元宝不足，无法购买物品'
                })
                return;
            }
            if (unit === 'tael' && tael < prices) {
                res.send({
                    code: 0,
                    message: '银两不足，无法购买物品'
                })
                return;
            }
            const message = knapsackFn.addKnapsack(req, res, { [durg.id]: durg});
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            // 店铺减少对应数量物品
            durg.s -= s;
            article[in_x] = durg;
            // 物品为零删掉对应信息
            durg.s || article.splice(in_x, 1);
            // 更新店主店铺信息
            await shopFn.asyncUpdataShopInfo(req, res, { article }, role_id);
            // 计算双方货币
            // 获取店主背包
            let { tael: tael_t, yuanbao: yuanbao_t } = await knapsackFn.getKnapsackInfo(req, res, { role_id });
            // 购买的玩家减少货币
            // 店主增加货币,扣除20%手续费
            if (unit === 'tael') {
                tael -= prices;
                tael_t += parseInt(prices * 0.8)
            }
            if (unit === 'yuanbao') {
                yuanbao -= prices;
                yuanbao_t += parseInt(prices * 0.8)
            }
            KnapsackG.updateknapsackGlobal(req, res, { tael, yuanbao });
            await knapsackFn.updateKnapsack(req, res, { tael: tael_t, yuanbao: yuanbao_t }, role_id);
            res.send({
                code: 0,
                data: article
            });
        }
        // 购买宠物
        if (type === 2) {
            const index = petList.findIndex(({ id }) => id === petId);
            if (index === -1) {
                res.send({
                    code: 0,
                    message: '购买宠物信息有误'
                })
                return;
            }
            const petInfo = petList[index];
            // 判断金钱是否足够
            const { price, unit, s } = petInfo;
            const prices = s * price;
            if (unit === 'yuanbao' && yuanbao < prices) {
                res.send({
                    code: 0,
                    message: '元宝不足，无法购买物品'
                })
                return;
            }
            if (unit === 'tael' && tael < prices) {
                res.send({
                    code: 0,
                    message: '银两不足，无法购买物品'
                })
                return;
            }

            // 获取我的宠物信息
            const { pet_pool } = RoleG.getRoleGlobal(req, res);
            const { l, x } = pet_pool;
            if (l.length >= x) {
                res.send({
                    code: 0,
                    message: "宠物房已满,无法购买"
                })
                return;
            }
            // 增加宠物
            pet_pool['l'].push({
                id: petId,
                n: petInfo['n'],
                s: 0,
            })
            RoleG.updataRoleGlobal(req, res, { pet_pool });
            // 店铺删除该宠物信息
            petList.splice(index, 1);
            // 更新店主店铺信息
            shopFn.asyncUpdataShopInfo(req, res, { petList }, role_id);
            // 更新店主宠物信息
            const { pet_pool: pet_pool_t } = await roleFn.getRoleInfo(req, res, { role_id });
            pet_pool_t['l'] = pet_pool_t['l'].filter(({ id }) => id !== petId);
            roleFn.updataRoleInfo(req, res, { pet_pool: pet_pool_t }, role_id);
            // 计算双方货币
            // 获取店主背包
            let { tael: tael_t, yuanbao: yuanbao_t } = await knapsackFn.getKnapsackInfo(req, res, { role_id });
            // 购买的玩家减少货币
            // 店主增加货币,扣除20%手续费
            if (unit === 'tael') {
                tael -= prices;
                tael_t += parseInt(prices * 0.8)
            }
            if (unit === 'yuanbao') {
                yuanbao -= prices;
                yuanbao_t += parseInt(prices * 0.8)
            }
            KnapsackG.updateknapsackGlobal(req, res, { tael, yuanbao });
            await knapsackFn.updateKnapsack(req, res, { tael: tael_t, yuanbao: yuanbao_t }, role_id);
            res.send({
                code: 0,
                data: petList
            });
        }
    }
}
