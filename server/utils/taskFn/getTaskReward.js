
const { KnapsackG, RoleG } = require('../../global');
const { addKnapsack } = require('../knapsackFn/addKnapsack');
const { computeRoleLevel } = require('../roleFn/computeRoleLevel');
const { integralMeun } = RoleG;
module.exports = {
    /**
     * 获取任务奖励
     * @param {*} req 
     * @param {*} res 
     * @param {*} reward 
     * @returns message 错误信息
     */
    getTaskReward: function (req, res, reward) {
        const { article, tael, role } = reward;
        if (reward) {
            const message = addKnapsack(req, res, { article });
            if (message) {
                return message
            }
        }
        if (tael) {
            const { tael: oldTael } = KnapsackG.getknapsackGlobal(req, res);
            KnapsackG.updateknapsackGlobal(req, res, { tael: oldTael + tael });
        }
        if (role) {
            const { role_integral } = RoleG.getRoleGlobal(req, res);
            let isIntegral = false;
            Object.keys(role).forEach((key) => {
                if (integralMeun.includes(key)) {
                    isIntegral = true;
                    role_integral[key] = role_integral[key] ? role_integral[key] + role[key] : role[key];
                }
            })
            if (role.exp) {
                computeRoleLevel(req, res, role.exp);
            }
            if (isIntegral) {
                RoleG.updataRoleGlobal(req, res, { role_integral });
            }
        }

    }
}