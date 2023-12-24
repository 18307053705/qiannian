const { TaskSystem } = require('@/system');
const { TaskG, rankTaskG, ActivityG } = require('@/global');
const { listenTask: listenTaskShenyuan } = require('../shenyuan/listenTask');
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
                if (type !== TASK_TYPE.zhandou) {
                    return;
                }
                // 未领取 待完成 已完成 不计算
                if (status === TASK_STATU.wait || status === TASK_STATU.can_complete || status === TASK_STATU.finished) {
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
        // 监听深渊
        listenTaskShenyuan(req, res, freakId);
        // 监听彩灵洞
        ActivityG.listenCaiLingDong(req, res, freakId);
        return freakObj;
    }
}