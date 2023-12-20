const { tpDirUpdate } = require('../grandFn/tpDirUpdate');
module.exports = {
    getTaskTPInfo: function (task) {
        const {  grand, status, complete } = task;
        const { npc, tNpc, freak = [] } = grand || {};
        // 未接任务
        if (status === 0) {
            return npc;
        }
        // 未完成
        if (status === 1 && freak.length) {
            const { freak: doneFreak } = complete;
            const freakIds = Object.key(doneFreak).filter((id) => doneFreak[id].c < doneFreak[id].s);
            return freak.find(({ id }) => freakIds.includes(id + ''));
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
