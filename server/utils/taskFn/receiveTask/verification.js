const { TaskSystem } = require('@/system');
const { TASK_TYPE_MEUN } = TaskSystem;

module.exports = {
    /**
     * 检验领取任务条件
     * @param {*} taskID  任务id
     * @param {*} taskType 任务类型
     * @returns error | undefined
     */
    verification: function ( taskID, taskType) {
        if (taskType === TASK_TYPE_MEUN.main) {
            return task.condition > role.role_level ? '等级不足' : undefined;
        }
        // 副本任务
        if (taskType === TASK_TYPE_MEUN.copy) {
            if (task.condition > role.role_level) {
                return '等级不足';
            }
            if (dailys.copyTask[taskID] < 0) {
                return '副本次数不足';
            }
            dailys.copyTask[taskID]--;
            return;
        }
        // 每日经验任务
        if (taskType === TASK_TYPE_MEUN.exp) {
            if (dailys.exp < 0) {
                return '每日经验任务已全部完成';
            }
            dailys.exp--;
            return;
        }
        // 每日金钱任务
        if (taskType === TASK_TYPE_MEUN.tael) {
            if (dailys.tael < 0) {
                return '每日金钱任务已全部完成';
            }
            dailys.tael--;
            return;
        }
        // 每日声望
        if (taskType === TASK_TYPE_MEUN.world) {
            if (dailys.world < 0) {
                return '每日声望任务已全部完成';
            }
            dailys.world--;
            return;
        }
        // 每日帮会任务
        if (taskType === TASK_TYPE_MEUN.gang) {
            if (dailys.gang < 0) {
                return '每日帮会任务已全部完成';
            }
            dailys.gang--;
            return;
        }
        // 每日结义任务
        if (taskType === TASK_TYPE_MEUN.intersect) {
            if (dailys.intersect < 0) {
                return '每日结义任务已全部完成';
            }
            dailys.intersect--;
            return;
        }
        // 每日功勋任务
        if (taskType === TASK_TYPE_MEUN.exploit) {
            if (dailys.exploit < 0) {
                return '每日功勋任务已全部完成';
            }
            dailys.exploit--;
            return;
        }
    }
}