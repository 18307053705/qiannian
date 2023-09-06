const { RoleG, TaskG, DailysG } = require('../../global');
const { createTask } = require('./createTask');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {
    /**
     * 初始化任务池
     * @param {*} req 
     * @param {*} res 
     */
    initTask: function (req, res) {
        const { task_pool } = RoleG.getRoleGlobal(req, res);
        task_pool.forEach(({ p, id, f,s }) => {
            createTask(req, res, p, id, {
                callback: function (task) {
                    if (task.complete) {
                        const freaks = task.complete.freak;
                        // 创建任务时通过回调,处理之前的杀怪任务进度
                        Object.keys(f || {}).forEach((freakId) => {
                            freaks[freakId].c = f[c];
                        })
                    }
                    task.status = s;
                }
            })
        })
        // can_task_pool.forEach(({ p, id }) => {
        //     const tasks = createTask(req, res, p, id, { noUpTaskG: true, isCan: true });
        //     TaskG.updataCanTaskGlobal(req, res, p, tasks);
        // })
        // const dailys = DailysG.getDailysGlobal(req, res);
        // if (dailys.lianHunDong) {
        //    createTask(req, res, TASK_TYPE_MEUN.copy, 1);
        // }
    }
}