const { AttrSystem, TaskSystem } = require('@/system');
const { TASK_TYPE_MEUN } = TaskSystem;
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
            const exps = AttrSystem.computeUpExp(level);
            let exp = 0;
            switch (Math.floor(level / 10)) {
                case 0:
                case 1:
                    exp = exps * 0.25;
                    break;
                case 2:
                    exp = exps * 0.125;
                    break;
                case 3:
                    exp = exps * 0.0625;
                    break;
                case 4:
                    exp = exps * 0.0425;
                    break;
                case 5:
                    exp = exps * (level > 55 ? 0.025 : 0.032);
                    break;
                case 6:
                    exp = exps * (level > 65 ? 0.02 : 0.025);
                    break;
                case 7:
                    exp = exps * 0.0125;
                    break;
                case 8:
                    exp = exps * 0.007;
                    break;
                case 9:
                    exp = exps * 0.003;
                    break;
                default:
                    exp = 5100000;
                    break
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
