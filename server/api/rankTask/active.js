
const { GrandG, rankTaskG } = require('../../global');
module.exports = {
    /**
     * 任务操作
     * @param freakId 怪物id 存在未领取奖励 不存在 领取任务
     */
    active: function (req, res) {
        const { freakId } = req.body;
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { id, s } = currentDir.task;
        let task = rankTaskG.getRankTask(req, res, id);
        if (!task) {
            task = rankTaskG.createRankTask(req, res, id);
        }
        // 领取任务
        if (!freakId) {
            task.status = 1;
            rankTaskG.updataRankTask(req, res, task);
        }
        // 领取奖励
        if (freakId) {
            // task.status = 1;
        }
        res.send({
            code: 0,
            data: {
                task,
                tNpc: s
            }
        })
    }
}