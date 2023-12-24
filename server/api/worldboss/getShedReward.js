const { ActivityG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn } = require("../../utils");
module.exports = {
    /**
     * 捡取BOSS掉落物品
     * @param {*} req.uid
     */
    getShedReward: function (req, res) {
        const { uid } = req.body;
        if (!uid) {
            ErrorG.paramsError(res);
            return;
        }


        const { shed } = ActivityG.getWorldBoss(req, res);

        const index = shed.findIndex((itme) => uid === itme.uid);
        if (index === -1) {
            res.send({
                code: 0,
                message: '你手速太慢了，该道具已经被人捡走了呢！'
            })
            return;
        }
        const { id, s } = shed[index];
        const { name } = knapsackTable.getArticle(id);
        const message = knapsackFn.addKnapsack(req, res, { [id]: { s, name, id } });
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
            success: `恭喜你捡到${name}x${s}`
        })
    }
};