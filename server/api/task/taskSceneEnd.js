

const { GrandG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
module.exports = {
    /**
     * 任务场景结束,即完成任务
     */
    taskSceneEnd: function (req, res) {
        const dir = GrandG.getDirGlobal(req, res);
        let { currentDir } = dir;
        const { taskId, taskType, isCan, repeat } = currentDir;
        const tasks = TaskG.getTaskGlobal(req, res, taskType);
        let task = tasks[taskId];
      
        const speed = taskFn.speedTask(req, res, task);
        console.log(speed,'speed...')
        // const { text } = tasks.reward || { text: [] };
        //  完成任务
        if (speed.done) {
            const message = taskFn.getTaskReward(req, res, task.reward);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return;
            }
            // 完成任务将任务从已领取队列中删除
            TaskG.deleteTaskGlobal(req, res, taskType, taskId);
            // 完成任务后判断是否有下个任务,有则加入已领取任务
            if (task.nextId) {
                const nextTasks = taskFn.createTask(req, res, taskType, task.nextId);
                task = nextTasks[task.nextId];
                const { npc } = task.grand;
                dir.currentDir = npc;
            }
        }
        res.send({
            code: 0,
            data: {
                ...task,
                isCan: currentDir.isCan,
                speed
            },

        })
    }



}




//  下环任务npc 坐标与当前坐标一致，直接获取奖励并返回下环任务信息
//  下环任务npc 坐标与当前坐标不一致，返回地图，下环任务信息加入可领取任务队列
//   