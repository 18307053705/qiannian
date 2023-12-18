const { TaskG, rankTaskG, ActivityG } = require('../../global');
const { listenTask: listenTaskShenyuan } = require('../shenyuan/listenTask');
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
        Object.keys(taskG || {}).forEach((type) => {
            const tasks = taskG[type];
            let isUpdata = false;
            Object.values(tasks).forEach(({ title, complete }, index) => {
                const { freak: freaks } = complete || {};
                if (freaks && freaks[freakId]) {
                    const freak = freaks[freakId];
                    freak.c += num;
                    freak.c > freak.s && (freak.c = freak.s);
                    freakObj[`${type}${index}`] = {
                        ...freak,
                        title
                    };
                    isUpdata = true;
                }
            })
            if (isUpdata) {
                TaskG.updataTaskGlobal(req, res, type, tasks);
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