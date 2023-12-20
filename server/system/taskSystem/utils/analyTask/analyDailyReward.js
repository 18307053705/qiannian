const { computeUpExp } = require('@/system/AttrSystem/utils/computeUpExp');
const { TASK_TYPE_MEUN } = require('../../enum');
module.exports = {
    /**
     * 获取日常任务奖励
     * @param {*} type 任务类型
     * @param {*} level 角色等级
     * @returns reward 奖励信息
     */
    analyDailyReward: function (type, level) {
        // 每日经验
        if (type === TASK_TYPE_MEUN.exp) {
            const exps = computeUpExp(level);
            let exp = 0;
            switch (parseInt(level / 10)) {
                case 0:
                case 1:
                case 2:
                    exp = exps * 0.5;
                    break;
                case 3:
                case 4:
                    exp = exps * 0.2;
                    break;
                case 5:
                case 6:
                    exp = exps * 0.1;
                    break;
                case 7:
                    exp = exps * 0.05;
                    break;
                case 8:
                    exp = exps * 0.02;
                    break;
                case 9:
                    exp = exps * 0.01;
                    break;
                default:
                    exp = exps * 0.002;
                    break;
            }
            return { exp: parseInt(exp) }
        }
        // 每日金钱
        if (type === TASK_TYPE_MEUN.tael) {
            return { tael: level * 1000 }
        }
        // 每日世界声望
        if (type === TASK_TYPE_MEUN.world) {
            return { world: 100 }
        }
        // 每日帮会任务
        if (type === TASK_TYPE_MEUN.gang) {
            return { gang: 100 }
        }
        // 每日结义任务
        if (type === TASK_TYPE_MEUN.intersect) {
            return { intersect: 100 }
        }
        // 每日功勋任务
        if (type === TASK_TYPE_MEUN.exploit) {
            return { exploit: 100 }
        }

    }
}

