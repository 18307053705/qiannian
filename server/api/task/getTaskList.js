const { TaskSystem } = require('@/system');
const { TaskG, DailysG } = require('@/global');
const { taskFn } = require('@/utils');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_MEUN, TASK_STATU } = TaskSystem;
module.exports = {
    /**
     * 获取任务列表
     * @param {*} req.type 任务类型默认main(mian:主线,exp:每日经验,tael:每日金钱,world:每日声望)
     */
    getTaskList: function (req, res) {
        const { type = TASK_TYPE_MEUN.main } = req.body;
        const role = RoleG.getRoleGlobal(req, res);
        const { dailyTask } = DailysG.getDailysGlobal(req, res);
        const { role_level } = role;
        let tasks = TaskG.getTaskGlobal(req, res, type);
        let message = '';
        // 判断是否为每日任务且未领取同类型任务
        if (DAIL_TYPE_LIST.includes(type) && !tasks) {
            if (dailyTask[type] <= 0) {
                message = `${TASK_TYPE_TEXT_MEUN[type]}已经达到领取上限。`;
                // 功勋任务需60级方可领取
            } else if (60 > role_level && type === TASK_TYPE_MEUN.exploit) {
                message = `${TASK_TYPE_TEXT_MEUN[type]}已经达到领取上限。`;
            }
            else {
                const taskID = TaskSystem.randomDailyTaskId();
                const task = taskFn.analyTask(req, res, taskID, type, role);
                task.status = TASK_STATU.wait_complete;
                tasks = { [taskID]: task };
                // 加入任务队列
                TaskG.updataTaskGlobal(req, res, type, tasks);
                // 每日任务减-1
                dailyTask[type]--;
                DailysG.updataDailysGlobal(req, res, { dailyTask });

            }

        }
        // 主线任务文案
        const mains = type !== TASK_TYPE_MEUN.main ? (TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {}) : tasks;
        // 计算任务数量
        const taskGNum = [];
        // 主线数量
        taskGNum.push({
            p: TASK_TYPE_MEUN.main,
            s: Object.values(mains || {}).length
        })

        // 每日任务数量
        DAIL_TYPE_LIST.forEach((type) => {
            // 角色低于60级不展示功勋任务
            if (type === TASK_TYPE_MEUN.exploit && 60 > role_level) {
                return
            }
            taskGNum.push({
                p: type,
                s: dailyTask[type]
            })
        })
        // 副本任务数量
        const copys = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        const copyLen = Object.values(copys).filter(({ status }) => status).length;
        if (copyLen) {
            taskGNum.push({
                p: TASK_TYPE_MEUN.copy,
                s: copyLen
            })
        }
        const task = {};
        // 判断是否为副本任务
        const isCopy = type === TASK_TYPE_MEUN.copy;
        Object.keys(tasks || {}).forEach((taskId) => {
            const taskItme = taskFn.getTaskScene(req, res, tasks[taskId]);
            const { tpInfo, status, level, connet, tips, levelText } = taskItme;
            // 未领取任务 且 自身等级小于任务等级
            const isLevel = !status && (level || 0) > role_level;
            // 未领取任务 剧情处理
            if (connet[connet.length - 1].includes('&')) {
                connet.splice(-1);
            }

            task[taskId] = {
                taskType: type, // 任务类型：主线|副本等
                complete: status ? taskFn.speedTask(req, res, taskItme) : undefined,
                connet: status ? [tips] : connet,
                title: taskItme.title,
                isActive: taskItme.isActive,
                reward: isCopy ? undefined : taskItme.reward,
                tpInfo: tpInfo ? { address: tpInfo.address, addressName: tpInfo.addressName } : undefined,
                type: taskItme.type, // 任务类型：战斗，收集等
                levelText: isLevel ? (levelText || `等级不足${level},先去升级吧！`) : undefined,
                status
            };

        })
        res.send({
            code: 0,
            message,
            data: {
                taskGNum,
                task,
            },
        })

    }
}