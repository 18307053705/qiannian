const { shopFn, petFn, knapsackFn } = require("@/utils");
module.exports = {
    /**
     * 物品上下架
     * @param {*} req.active (1:上架,2:下架)
     * @param {*} req.type (1:物品,2:宠物)
     * @param {*} req.price 价格
     * @param {*} req.unit 单位(tael,yuanbao)
     * @param {*} req.s  上架数量
     * @param {*} req.uid  物品uid
     * @param {*} req.petId  宠物id
     */
    grounding: async function (req, res) {
        const { type, uid, active, s, price, unit, petId } = req.body;
        if (!active || !type) {
            ErrorG.paramsError(res);
            return;
        }
        // 上架必须有单位
        if (active === 1 && !price && (unit !== 'tael' && unit !== 'yuanbao')) {
            ErrorG.paramsError(res);
            return;
        }
        // 物品参数校验
        if (type === 1 && !uid) {
            ErrorG.paramsError(res);
            return;
        }
        // 宠物参数校验
        if (type === 2 && !petId) {
            ErrorG.paramsError(res);
            return;
        }


        const { article, petList } = await shopFn.asyncGetShopInfo(req, res);
        // 物品上架
        if (active === 1 && type === 1) {
            // 判断物品货架是否已满
            if (article.length === 50) {
                res.send({
                    code: 0,
                    message: '无法上架更多物品'
                })
                return;
            }
            const { data } = KnapsackG.getknapsackGlobal(req, res);
            // 验证上架物品信息
            const in_x = data.findIndex((itme) => itme.uid === uid);
            const durg = data[in_x];
            if (!durg || durg['s'] < s) {
                res.send({
                    code: 0,
                    message: '上架物品信息有误'
                })
                return;
            }
            durg['s'] -= s;
            durg['s'] || data.splice(in_x, 1);

            article.push({
                name: durg.name,
                id: durg.id,
                s,
                price,
                unit,
                ext: durg.ext,
                n: durg.n,
            })
            await shopFn.asyncUpdataShopInfo(req, res, { article });
            KnapsackG.updateknapsackGlobal(req, res, { data });
            res.send({
                code: 0,
                data
            })
            return;
        }

        // 宠物上架
        if (active === 1 && type === 2) {
            // 判断物品货架是否已满
            if (petList.length === 10) {
                res.send({
                    code: 0,
                    message: '无法上架更多物品'
                })
                return;
            }
            // 宠物验证
            const { pet_pool } = RoleG.getRoleGlobal(req, res);
            const { c, l } = pet_pool;
            const index = l.findIndex(({ id }) => id === petId);
            if (index === -1) {
                res.send({
                    code: 0,
                    message: '你没有该宠物'
                })
                return;
            }
            const petItme = l[index];
            if (c.id === petId || petItme.s === 1 || petItme.s === 2) {
                res.send({
                    code: 0,
                    message: '出战宠物无法上架'
                })
                return;
            }
            if (petItme.s === 3) {
                res.send({
                    code: 0,
                    message: '该宠物已经上架'
                })
                return;
            }
            const { name, flair_x } = await petFn.getPetInfo(req, res, petId);
            petList.push({
                n: name,
                id: petId,
                s: 1,
                price,
                unit,
                flair_x
            })

            pet_pool['l'][index] = {
                ...petItme,
                s: 3
            }
            await shopFn.asyncUpdataShopInfo(req, res, { petList });
            RoleG.updataRoleGlobal(req, res, { pet_pool });
            res.send({
                code: 0,
                data: '上架宠物成功!'
            })
            return;
        }

        // 物品下架
        if (active === 2 && type === 1) {
            const in_x = article.findIndex((itme) => itme.uid === uid);
            const durg = article[in_x];
            if (!durg) {
                res.send({
                    code: 0,
                    message: '下架物品信息有误'
                })
                return;
            }

            const message = knapsackFn.addKnapsack(req, res, { [durg.id]: durg });
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            article.splice(in_x, 1);
            await shopFn.asyncUpdataShopInfo(req, res, { article });
            res.send({
                code: 0,
                data: '下架成功!'
            })
            return;
        }
        // 宠物下架
        if (active === 2 && type === 2) {
            const index = petList.findIndex(({ id }) => id === petId);
            if (index === -1) {
                res.send({
                    code: 0,
                    message: '下架宠物信息有误'
                })
                return;
            }
            petList.splice(index, 1);
            const { pet_pool } = RoleG.getRoleGlobal(req, res);
            pet_pool.l = pet_pool.l.map((itme) => {
                if (itme.id === petId) {
                    itme.s = 0;
                }
                return itme;
            });
            RoleG.updataRoleGlobal(req, res, { pet_pool });
            await shopFn.asyncUpdataShopInfo(req, res, { petList });
            res.send({
                code: 0,
                data: '下架成功!'
            })
            return;
        }

    }
}

