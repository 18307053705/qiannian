
const { GrandTable } = require('../../table');
const { tpDirUpdate } = require('../grandFn/tpDirUpdate');

module.exports = {
    getTaskTPInfo: function (req, res, task) {
        const { type, grand, status, tp } = task;
        const { npc, tNpc, freak } = grand;
        // 未接任务
        if (status === 0) {
            return npc
        }
        // 未完成 且 战斗任务
        if (status === 1 && type === 1) {
            return freak[0] || {
                address: tp,
                addressName: tp ? GrandTable.getGrandName(tp) : ''
            }
        }
        // 未完成 且 对话任务 
        if (status === 1 && type === 2) {
            return tNpc || npc
        }
        // 未完成 且 收集任务
        if (status === 1 && type === 3) {
            return {
                address: tp,
                addressName: GrandTable.getGrandName(tp)
            }
        }
    },
    /**
     * 任务传送
     * @param {*} req 
     * @param {*} res 
     * @param {*} task
     */
    taskTp: function (req, res, task) {
        const { address } = this.getTaskTPInfo(req, res, task) || {};
        tpDirUpdate(req, res, address);
    },
}
