const { TaskSystem } = require('@/system');
const { TaskG, rankTaskG } = require('@/global');
const { TASK_STATU, TASK_TYPE } = TaskSystem;
module.exports = {
    /**
     * 监听任务击杀进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} freakId 怪物id
     * @param {*} num 怪物数量
     * @returns done true 完成
     * @returns exist 当前物品信息
     * @returns fight 当前杀过信息
     */
    listenTask: function (req, res, freakId, num) {
        const taskG = TaskG.getTaskGlobal(req, res, 'all');
        const freakObj = {};
        Object.keys(taskG || {}).forEach((taskType) => {
            const tasks = taskG[taskType];
            let isUpdata = false;
            Object.values(tasks).forEach((task, index) => {
                const { title, complete, status, type } = task;
                // 非战斗类型不计算
                if (type !== TASK_TYPE.zhandou) {
                    return;
                }
                // 非未完成状态不计算
                if (status !== TASK_STATU.wait_complete) {
                    return;
                }
                const { freak: freaks } = complete;
                if (!freaks[freakId]) {
                    return;
                }
                const freak = freaks[freakId];
                freak.c += num;
                if (freak.c >= freak.s) {
                    freak.c = freak.s;
                    // 判断任务是否完成
                    if (!Object.values(freaks).find(({ c, s }) => s > c)) {
                        complete.done = true;
                        task.status = TASK_STATU.can_complete;
                    }
                }
                freakObj[`${taskType}${index}`] = {
                    ...freak,
                    title
                };
                isUpdata = true;

            })
            if (isUpdata) {
                TaskG.updataTaskGlobal(req, res, taskType, tasks);
            }
        })
        // 监听组队任务
        rankTaskG.listenTask(req, res, freakId, num, freakObj);
        // 监听彩灵洞
        // ActivityG.listenCaiLingDong(req, res, freakId);
        // // 洞天福地监听
        // if ([20623, 20624, 20625, 20626, 20627, 20628].includes(freakId)) {
        //     const { upper_limit } = RoleG.getRoleGlobal(req, res);
        //     upper_limit.dongTian = (upper_limit.dongTian || 0) + 1;
        //     RoleG.updataRoleGlobal(req, res, { upper_limit });
        // }
        return freakObj;
    }
}