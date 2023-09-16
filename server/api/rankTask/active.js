
const { GrandG, rankTaskG, RoleG } = require('../../global');
const { getReward } = require('./fun/getReward')
module.exports = {
    /**
     * 任务操作
     * @param freakId 怪物id 存在未领取奖励 不存在 领取任务
     */
    active: async function (req, res) {
        const { freakId } = req.body;
        const { role_id } = RoleG.getRoleGlobal(req, res);
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
            const { freak: freaks, fun } = task;
            const index = freaks.findIndex(({ id }) => id === freakId);

            if (index === -1) {
                res.send({
                    code: 0,
                    message: '非法领取奖励'
                })
                return;
            }
            const freak = freaks[index];
            const { s, c, role } = freak;
            if (s > c) {
                res.send({
                    code: 0,
                    message: '不满足领取条件'
                })
                return;
            }
            if (role.includes(role_id)) {
                res.send({
                    code: 0,
                    message: '不可重复领取'
                })
                return;
            }
            const message = await getReward(req, res, fun, freak);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            freaks[index].role.push(role_id);
            rankTaskG.updataRankTask(req, res, task);
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