const { TaskSystem } = require('@/system');
const taskTp = require('./taskTp');
const { TASK_STATU } = TaskSystem;
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res, task) {
        const { role_name } = RoleG.getRoleGlobal(req, res);
        const { replace, treat, tips, receive, done, status } = task;
        let connet = '';
        let isActive = true;
        // 未接任务文案
        if (status === TASK_STATU.wait || status === TASK_STATU.received) {
            connet = replace ? receive.map((text) => text.replace('{name}', role_name)) : receive;
        }
        // 任务进行中(未完成)
        if (status === TASK_STATU.wait_complete) {
            connet = treat || [tips];
            connet = replace ? connet.map((text) => text.replace('{name}', role_name)) : connet;
            isActive = false
        }
        // 已完成
        if (status === TASK_STATU.can_complete || status === TASK_STATU.finished) {
            connet = replace ? done.map((text) => text.replace('{name}', role_name)) : done;
        }
        return {
            ...task,
            connet,
            tpInfo: taskTp.getTaskTPInfo(task),
            status,
            isActive
        }

    }
}