const { RoleG, TaskG } = require('../../global');
const { createTask } = require('./createTask');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {
    /**
     * 初始化任务池
     * @param {*} req 
     * @param {*} res 
     */
    initTask: function (req, res) {
        const { task_pool, role_level } = RoleG.getRoleGlobal(req, res);
        // 记录在任务中的副本
        const copyTaskIds = {};
       
        task_pool.forEach(({ p, id, f, s = 0 }) => {
            if (p === TASK_TYPE_MEUN.copy) {
                copyTaskIds[id] = {
                    f,
                    s,
                    id
                };
            }
            createTask(req, res, p, id, {
                callback: function (task) {
                    if (task.complete) {
                        const freaks = task.complete.freak;
                        // 创建任务时通过回调,处理之前的杀怪任务进度
                        Object.keys(f || {}).forEach((freakId) => {
                            freaks[freakId].c = f[freakId];
                        })
                    }
                    task.status = s;
                }
            })
        })
        Object.values(copyTaskIds).forEach(({ f, s, id }) => {
            createTask(req, res, TASK_TYPE_MEUN.copy, id, {
                callback: function (task) {
                    if (task.complete) {
                        const freaks = task.complete.freak;
                        // 创建任务时通过回调,处理之前的杀怪任务进度
                        Object.keys(f || {}).forEach((freakId) => {
                            freaks[freakId].c = f[freakId];
                        })
                    }
                    task.status = s;
                }
            });
        })
    }
}