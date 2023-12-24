const { TaskSystem } = require('@/system');
const { tpDirUpdate } = require('../grandFn/tpDirUpdate');
const { TASK_STATU } = TaskSystem;
module.exports = {
    getTaskTPInfo: function (task) {
        const { grand, status, complete } = task;
        const { npc, tNpc, freak = [] } = grand || {};
        // 未接任务
        if (status === TASK_STATU.wait || TASK_STATU.received === status) {
            return npc;
        }
       
        // 未完成
        if (status === TASK_STATU.wait_complete && freak.length) {
            const { freak: doneFreak = {} } = complete || {};
            const freakIds = Object.keys(doneFreak).find((id) => doneFreak[id].c < doneFreak[id].s);
            return freak.find(({ id }) => freakIds == id);
        }
        return tNpc || npc;
    },
    /**
     * 任务传送
     * @param {*} req 
     * @param {*} res 
     * @param {*} task
     */
    taskTp: function (req, res, task) {
        const { address } = this.getTaskTPInfo(task) || {};
        tpDirUpdate(req, res, address);
    },
}
