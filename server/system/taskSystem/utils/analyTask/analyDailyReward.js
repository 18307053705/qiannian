const { computeUpExp } = require('@/system/AttrSystem/utils/computeUpExp');
const { TASK_TYPE_MEUN } = require('../../meun');
module.exports = {
    /**
     * 获取日常任务奖励
     * @param {*} type 任务类型
     * @param {*} level 角色等级
     * @returns reward 奖励信息
     * @returns reward.text 奖励文案[]
     */
    analyDailyReward: function (type, level) {
        const reward = {};
        const text = [];
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
            reward.exp = parseInt(exp);
            text.push(`经验+${reward.exp}`);
        }
        // 每日金钱
        if (type === TASK_TYPE_MEUN.tael) {
            reward.tael = level * 1000;
            text.push(`银两+${reward.tael}`);
        }
        // 每日世界声望
        if (type === TASK_TYPE_MEUN.world) {
            reward['world'] = 100;
            text.push(`世界声望+${100}`);
        }
        // 每日帮会任务
        if (type === TASK_TYPE_MEUN.gang) {
            reward['gang'] = 100;
            text.push(`帮会声望+${100}`);
        }
        // 每日结义任务
        if (type === TASK_TYPE_MEUN.intersect) {
            reward['intersect'] = 100;
            text.push(`结义声望+${100}`);
        }
        // 每日功勋任务
        if (type === TASK_TYPE_MEUN.exploit) {
            reward['exploit'] = 50;
            text.push(`世界功勋+${50}`);
        }
        reward.text = text;
        return reward;

    }
}

