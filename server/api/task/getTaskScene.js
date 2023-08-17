
const { GrandG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
const { TaskTable } = require('../../table');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { taskId, taskType, isCan } = currentDir;
        let task = undefined;
        // 获取对应任务信息,存在代表未接任务,否则已接任务
        if (isCan) {
            const canTasks = TaskG.getCanTaskGlobal(req, res, taskType);
            task = canTasks[taskId];
        } else {
            const tasks = TaskG.getTaskGlobal(req, res, taskType);
            task = tasks[taskId];
        }

        // 接取任务
        // if (isCan) {
        //     TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        //     TaskG.deleteCanTaskGlobal(req, res, taskType, taskId);
        //     // 当前元素指令更改为 已接取状态
        //     delete currentDir.isCan;
        // }
        
        res.send({
            code: 0,
            data: {
                ...task,
                isCan,
            }
        })
    }
}