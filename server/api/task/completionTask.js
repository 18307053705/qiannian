
const { TaskG, DailysG } = require('@/global');
const { taskFn } = require('@/utils');
const { TaskSystem } = require('@/system');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_MEUN } = TaskSystem;
module.exports = {
    /**
     * 一键完成任务
     * @param {*} req.type 任务类型
     */
    completionTask: function (req, res) {
        const { type } = req.body;
        if (!DAIL_TYPE_LIST.includes(type)) {
            ErrorG.paramsError(res);
            return;
        }
        const role = RoleG.getRoleGlobal(req, res);
        const { role_level } = role;
        // 功勋任务需60级方可领取
        if (60 > role_level && type === TASK_TYPE_MEUN.exploit) {
            res.send({
                code: 0,
                message: '每日功勋任务需要60级方才开启。'
            })
            return;
        }

        const { dailyTask } = DailysG.getDailysGlobal(req, res);
        const tasks = TaskG.getTaskGlobal(req, res, type);
        let dailyNum = dailyTask[type];
        if (tasks) {
            Object.values(tasks).forEach(({ id }) => {
                dailyNum++;
                TaskG.deleteTaskGlobal(req, res, type, id);
            })
        }
        if (dailyNum <= 0) {
            res.send({
                code: 0,
                message: `你已完成全部${TASK_TYPE_TEXT_MEUN[type]}。`
            })
            return;
        }
        const taskID = TaskSystem.randomDailyTaskId(role_level);
        const { reward } = taskFn.analyTask(req, res, taskID, type, role);
        Object.keys(reward).forEach(key => {
            // 奖励翻倍
            reward[key] = reward[key] * dailyNum;
        });
        taskFn.getTaskReward(req, res, reward);
        dailyTask[type] = 0;
        DailysG.updataDailysGlobal(req, res, { dailyTask });
        res.send({
            code: 0,
            data:reward
        })
    }
}