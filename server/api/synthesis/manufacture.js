const { knapsackTable } = require('@/table');
const { knapsackFn } = require('@/utils');

function getMaterial(material) {
    const obj = {};
    material.split(',').forEach(itme => {
        const [id, s = 1] =  itme.split('-');
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
     * 合成物品
     * @param {*} req.uid 合成物品id
     */
    manufacture: function (req, res) {
        const { uid } = req.body;
        if (!uid) {
            ErrorG.paramsError(res);
            return;
        }

        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        const data = knapsackTable.getSynthesis(uid);

        if (!data) {
            res.send({
                code: 0,
                data: '合成物品异常'
            });
            return;
        }
        if (data.tael > tael) {
            res.send({
                code: 0,
                data: '合成失败,银两不足'
            });
            return;
        }
        const { message, success } = knapsackFn.deleteKnapsack(req, res, getMaterial(data.material));
        if (message) {
            res.send({
                code: 0,
                message
            });
            return;
        }
        const { article, min, max } = data;
        const { id, name } = article;
        let s = 1;
        if (min && max) {
            s = Math.floor(Math.random() * (max - min)) + min;
        }
        const messageAdd = knapsackFn.addKnapsack(req, res, { [id]: { id, name, s } });
        if (messageAdd) {
            res.send({
                code: 0,
                message: messageAdd
            });
            return;
        }
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael - data.tael });

        res.send({
            code: 0,
            success: `恭喜你合成${name}x${s}`
        })
    }
}
