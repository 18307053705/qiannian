const { TaskG } = require('../../global');
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
            Object.values(tasks).forEach(({ title, complete, type: taskType }, index) => {
                if (taskType !== 1) {
                    return;
                }
                const { freak: freaks } = complete;
                if (freaks && freaks[freakId]) {
                    const freak = freaks[freakId];
                    freak.c += num;
                    freak.c > freak.s && (freak.c = freak.s);
                    isUpdata = true;
                    freakObj[`${type}${index}`] = {
                        ...freak,
                        title
                    };
                }
            })
            if (isUpdata) {
                TaskG.updataTaskGlobal(req, res, type, tasks);
            }
        })
        return freakObj;
    }
}