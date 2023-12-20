
const { RoleG } = require('../../global');
const { speedTask } = require('./speedTask');
const taskTp = require('./taskTp');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskSceneInfo: function (req, res, task, oldStatus = task.status) {
        const { role_name } = RoleG.getRoleGlobal(req, res);
        const { replace, complete, treat, tips, receive, done } = task;
        let connet = '';
        // 未接任务文案
        if (oldStatus === 0) {
            connet = replace ? receive.map((text) => text.replace('{name}', role_name)) : receive;
        }
        // 任务进行中(未完成)
        if (oldStatus === 1) {
            connet = treat || [tips];
            connet = replace ? connet.map((text) => text.replace('{name}', role_name)) : connet;
        }
        // 已完成
        if (oldStatus === 2 || oldStatus === 3) {
            connet = replace ? done.map((text) => text.replace('{name}', role_name)) : done;
        }

        return {
            ...task,
            speed: complete ? speedTask(req, res, task) : undefined,
            connet,
            tpInfo: taskTp.getTaskTPInfo(task)
        }

    }
}