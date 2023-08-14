const { TaskG, RoleG } = require('../../global');

module.exports = {
    /**
     * 初始化任务池
     * @param {*} req 
     * @param {*} res 
     */
    initTask: function (req, res) {
        const { can_task_pool, task_pool, role_level, role_id } = RoleG.getRoleGlobal(req, res);
        let exploitNum = 0;
        let taskNum = 8;
        if (role_level > 65) {
            taskNum = 12;
        }
        if (role_level > 74) {
            exploitNum = 8;
            taskNum = 15;
        }
        const tael = taskNum;
        const world = taskNum;
        const exp = taskNum;

        const tasks = {};
        Object.keys(task_pool).forEach((type) => {
            tasks[type] = task_pool[type].map((id) => this.createTask({ req, type, id }))
        })
        Global.taskLoop = {
            [role_id]: {
                ...tasks,
                exp,
                tael,
                world,
            }
        };
        Global.canTaskPool[role_id] = can_task_pool;
        // 判断是否拥有功勋任务
        if (exploitNum) {
            Global.taskLoop[role_id]['exploit'] = new Array(exploitNum);
        }
    }
}