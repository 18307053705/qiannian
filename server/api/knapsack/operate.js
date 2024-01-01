const { GrandG } = require('@/global');
const { knapsackFn, equipFn } = require('@/utils');
const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 物品操作
     * @param {*} type 1:使用物品,2:入库,3:出库,4:丢弃
     */
    operate: async (req, res) => {
        const { uid, s, type } = req.body;
        if (!type || typeof s !== 'number') {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = await knapsackFn.asyncGetKnapsack(req, res, { type });
        const in_x = data.findIndex((itme) => itme.uid === uid);

        if (in_x === -1) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const { id, name, ext, n, ...item } = data[in_x];
        if (item.s < s) {
            res.send({
                code: 0,
                message: '物品数量不足'
            })
            return;
        }
        const isEquip = knapsackTable.isEquip(id);
        let message = '';
        let success = '';
        //  使用物品
        if (type === 1 && !isEquip) {
            const results = knapsackFn.eatArticle(req, res, id, s);
            if (results.success || results.active) {
                const list = results.data || data;
                const in_x = list.findIndex((itme) => itme.uid === uid);
                success = results.success;
                list[in_x]['s'] -= s;
                list[in_x]['s'] || list.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data: list });
            } else {
                message = results.message;
            }

        }
        // 佩戴装备
        if (type === 1 && isEquip) {
            const results = equipFn.wearEquip(req, res, data[in_x]);
            if (!results.message) {
                results.replaceEquip ? (data[in_x] = results.replaceEquip) : data.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data });
            } else {
                message = results.message;
            }
        }
        // 入库
        if (type === 2) {
            const { data: wareData } = await knapsackFn.asyncGetKnapsack(req, res, { type: 3 });
            const article = { [id]: { id, name, s } };
            const { message, data: newWareData } = knapsackFn.addArticle(article, wareData);
            if (!message) {
                data[in_x]['s'] -= s;
                data[in_x]['s'] || data.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data });
                await knapsackFn.updateWarehouse(req, res, { data: newWareData });
            } else {
                message = '仓库已满,无法继续存入物品';
            }
        }
        // 出库
        if (type === 3) {
            const { data: knaData } = await knapsackFn.asyncGetKnapsack(req, res);
            const article = { [id]: { id, name, s } }
            message = knapsackFn.addKnapsack(req, res, article, { data: knaData });
            if (!message) {
                data[in_x]['s'] -= s;
                data[in_x]['s'] || data.splice(in_x, 1);
                await knapsackFn.updateWarehouse(req, res, { data });
            } else {
                message = '背包已满,无法继续取出物品';
            }
        }
        // 丢弃
        if (type === 4) {
            data[in_x]['s'] -= s;
            data[in_x]['s'] || data.splice(in_x, 1);
            KnapsackG.updateknapsackGlobal(req, res, { data });
            GrandG.setGrandEleGlobal(req, res, { article: [{ id, s, ext, n }] });
        }
        res.send({
            code: 0,
            message,
            success,
        })
    }
};
