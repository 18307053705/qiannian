
const { GrandTable } = require('../../table');
const { tpDirUpdate } = require('../grandFn/tpDirUpdate');

module.exports = {
    getTaskTPInfo: function (req, res, task) {
        const { type, grand, status, tp, speed } = task;
        const { npc, tNpc, freak = [] } = grand || {};
        // 未接任务
        if (status === 0) {
            return npc
        }
        // 未完成 且 战斗任务
        if (status === 1 && type === 1) {
            let tpInfo = speed ? Object.values(speed.fight).find(({ c, s }) => c < s) : freak[0];
            if (tpInfo) {
                tpInfo = freak.find(({ id }) => tpInfo.id === id)
            }
            return tpInfo || {
                address: tp,
                addressName: tp ? GrandTable.getGrandName(tp) : '',
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
        if (status === 2 || status === 3) {
            return tNpc || npc
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
