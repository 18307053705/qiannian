
const { RoleG } = require('../../global');
const { getTaskTPInfo } = require('./taskTp');
const { speedTask } = require('./speedTask');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskSceneInfo: function (req, res, task, oldStatus = task.status) {
        console.log(oldStatus,'oldStatus...')
        const { role_name } = RoleG.getRoleGlobal(req, res);
        const { status, grand, receive = [], done = [], reward, replace, complete, treat, tips } = task;
        // const currentStatus = oldStatus || status
        const base = {
            id: task.id,
            title: task.title,
            type: task.type,
            tips: task.tips,
            status,
            reward,
            grand,
            // 没有任务条件无需计算进度
            speed: complete ? speedTask(req, res, task) : undefined,
            tpInfo: getTaskTPInfo(req, res, task),
        }
        // 未接任务文案
        if (oldStatus === 0) {
            return {
                connet: replace ? receive.map((text) => text.replace('{name}', role_name)) : receive,
                ...base
            }
        }
        // 任务进行中(未完成)
        if (oldStatus === 1) {
            let connet = treat || [tips];
            return {
                connet: replace ? connet.map((text) => text.replace('{name}', role_name)) : connet,
                ...base
            }
        }
        // 已完成
        if (oldStatus === 2 || oldStatus === 3) {
            return {
                connet: replace ? done.map((text) => text.replace('{name}', role_name)) : done,
                ...base
            }
        }
    }
}