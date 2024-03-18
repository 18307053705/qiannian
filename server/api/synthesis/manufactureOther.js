const { knapsackTable } = require('@/table');
const { knapsackFn } = require('@/utils');

function getMaterial(material) {
    const obj = {};
    material.split(',').forEach(itme => {
        const [id, s = 1] = itme.split('-');
        const idNum = Number(id);
        const { name } = knapsackTable.getArticle(id);
        obj[idNum] = {
            id: idNum,
            name,
            s: Number(s)
        }
    })
    return obj;
}

module.exports = {
    /**
     * 合成其他物品 强化卡，魔符，技能书
     * @param {*} req.uid 合成物品id
     * @param {*} req.s 合成物品数量
     */
    manufactureOther: function (req, res) {
        const { uid, s } = req.body;
        if (!uid || s <= 0) {
            ErrorG.paramsError(res);
            return;
        }
        // 合成目标
        const targer = knapsackTable.getArticle(uid);
        if (!targer?.manufacture) {
            res.send({
                code: 0,
                data: '合成物品异常'
            });
            return;
        }
        const { manufacture } = targer;
        const drainData = knapsackTable.getArticle(manufacture.id);

        const drainArticle = {
            [drainData.id]: {
                id: drainData.id,
                s: manufacture.s * s,
                name: drainData.name
            }

        }

        const { result } = knapsackFn.chekeKnapsack(req, res, drainArticle);

        if (!result) {
            res.send({
                code: 0,
                message: `${drainData.name}数量不足${manufacture.s * s},合成失败。`,
                drainData
            });
            return;
        }
        // 添加合成物品
        const messageAdd = knapsackFn.addKnapsack(req, res, { [targer.id]: { id: targer.id, name: targer.name, s } });
        if (messageAdd) {
            res.send({
                code: 0,
                message: messageAdd
            });
            return;
        }
        // 消耗对应合成物品
        knapsackFn.deleteKnapsack(req, res, drainArticle)

        res.send({
            code: 0,
            success: `恭喜你合成${targer.name}x${s}`
        })
    }
}
