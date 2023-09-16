
const { GrandG, rankTaskG,RoleG } = require('../../global');
module.exports = {
    /**
     * 任务场景信息
     */
    getTaskScene: function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { id, s } = currentDir.task;
        let task = rankTaskG.getRankTask(req, res, id);
        if (!task) {
            task = rankTaskG.createRankTask(req, res, id);
        }
        res.send({
            code: 0,
            data: {
                task,
                tNpc: s,
                role_id
            }
        })
    }
}