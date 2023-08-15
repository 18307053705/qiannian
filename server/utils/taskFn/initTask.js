const { RoleG, TaskG } = require('../../global');
const { createTask } = require('./createTask');

module.exports = {
    /**
     * 初始化任务池
     * @param {*} req 
     * @param {*} res 
     */
    initTask: function (req, res) {
        const { can_task_pool, task_pool } = RoleG.getRoleGlobal(req, res);
        task_pool.forEach(({ p, id, f }) => {
            createTask(req, res, p, id, {
                callback: function (task) {
                    if (task.complete) {
                        const freaks = task.complete.freak;
                        // 创建任务时通过回调,处理之前的杀怪任务进度
                        Object.keys(f || {}).forEach((freakId) => {
                            freaks[freakId].c = f[c];
                        })
                    }

                }
            })
        })
        can_task_pool.forEach(({ p, id }) => {
            const tasks = createTask(req, res, p, id, { noUpTaskG: true });
            TaskG.updataCanTaskGlobal(req, res, p, tasks);
        })
    }
}