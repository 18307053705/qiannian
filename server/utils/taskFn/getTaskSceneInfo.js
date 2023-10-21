
const { RoleG } = require('../../global');
const { getTaskTPInfo } = require('./taskTp');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskSceneInfo: function (req, res, task) {
        const { role_name } = RoleG.getRoleGlobal(req, res);
        const { status, grand, receive = [], done = [], reward, replace, complete, treat } = task;
        // 未接任务文案
        if (status === 0) {
            return {
                connet: replace ? receive.map((text) => text.replace('${role_name}', role_name)) : receive,
                grand,
                task,
                tp: getTaskTPInfo(req, res, task)
            }
        }
        // 任务进行中(未完成)
        if (status === 1) {
            return {
                connet: replace ? treat.map((text) => text.replace('${role_name}', role_name)) : treat,
                complete,
                grand,
                task,
                tp: getTaskTPInfo(req, res, task)
            }
        }
        // 已完成
        if (status === 2 || status === 3) {
            return {
                reward,
                connet: replace ? done.map((text) => text.replace('${role_name}', role_name)) : done,
                grand,
                task,
                tp: getTaskTPInfo(req, res, task)
            }
        }
    }
}