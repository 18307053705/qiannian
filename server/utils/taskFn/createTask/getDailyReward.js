const { TaskTable } = require('../../../table');
const { computeUpExp } = require('../../roleFn/computeUpExp')
module.exports = {
    /**
     * 获取日常任务奖励
     * @param {*} type 任务类型(exp,tael,world,
     * @param {*} level 角色等级
     * @returns reward 奖励信息
     * @returns reward.role {exp:100,world:100,gang:100,intersect:100,exploit:100}
     * @returns reward.tael
     * @returns reward.text 奖励文案[]
     */
    getDailyReward: function (type, level) {
        const { TASK_TYPE_MEUN } = TaskTable;
        const reward = { role: {} };
        let tael = 0;
        let text = [];
        // 每日经验
        if (type === TASK_TYPE_MEUN.exp) {
            const exps = computeUpExp(level);
            let exp = 0;
            switch (parseInt(level / 10)) {
                case 0:
                case 1:
                case 2:
                    exp = exps * 0.5;
                case 3:
                case 4:
                    exp = exps * 0.2;
                case 5:
                case 6:
                    exp = exps * 0.1;
                case 7:
                    exp = exps * 0.05;
                case 8:
                    exp = exps * 0.02;
                case 9:
                    exp = exps * 0.01;
                default:
                    exp = exps * 0.002;
            }
            reward.role['exp'] = parseInt(exp);
            text.push(`经验+${role['exp']}`);
        }
        // 每日金钱
        if (type === TASK_TYPE_MEUN.tael) {
            delete  reward.role;
            reward.tael = level * 1000;
            text.push(`银两+${tael}`);
        }
        // 每日世界声望
        if (type === TASK_TYPE_MEUN.world) {
            reward.role['world'] = 100;
            text.push(`世界声望+${100}`);
        }
        reward.text = text;
        return reward;

    }
}

