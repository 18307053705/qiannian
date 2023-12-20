const { TaskSystem } = require('@/system');
const { RoleG, TaskG } = require('../../global');
module.exports = {
    /**
     * 初始化任务池
     * @param {*} req 
     * @param {*} res 
     */
    initTask: function (req, res) {
        const { task_pool, ...role } = RoleG.getRoleGlobal(req, res);
        // 记录在任务中的副本
        const tasks = {};
        // id 任务id
        // p 任务类型
        // f 击杀进度{id:c}
        // s 任务状态
        task_pool.forEach(({ p, id, f, s = 0 }) => {
            tasks[p] || (tasks[p] = {});
            const task = TaskSystem.analyTask(req, res, id, p, role);
            task.status = s;
            if (task?.complete?.freak) {
                Object.keys(f || {}).forEach((freakId) => {
                    task.complete.freak[freakId].c = f[freakId];
                })
            }
            tasks[p][id] = task;
        });

        Object.keys(tasks).forEach((type) => {
            TaskG.updataTaskGlobal(req, res, Number(type), tasks[type]);
        })

    }
}