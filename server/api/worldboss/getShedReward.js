const { ActivityG, ErrorG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn } = require("../../utils");
module.exports = {
    /**
     * 捡取BOSS掉落物品
     * @param {*} req.id_x
     */
    getShedReward: function (req, res) {
        const { id_x: idX } = req.body;
        if (idX === undefined) {
            ErrorG.paramsError(res);
            return;
        }


        const { shed } = ActivityG.getWorldBoss(req, res);

        const index = shed.findIndex(({ id_x }) => idX === id_x);
        if (index === -1) {
            res.send({
                code: 0,
                message: '你手速太慢了，该道具已经被人捡走了呢！'
            })
            return;
        }
        const { id, s } = shed[index];
        const { n, type } = knapsackTable.getArticle(id);
        const artReward = { [id]: { p: type, s, n, id } };
        const message = knapsackFn.addKnapsack(req, res, { article: { artReward } });
        if (message) {
            res.send({
                code: 0,
                message,
            })
            return;
        }
        shed.splice(index, 1)
        ActivityG.updateWorldBoss(req, res, { shed });
        res.send({
            code: 0,
            data: { shed },
            success: `恭喜你捡到${n}x${s}`
        })
    }
};