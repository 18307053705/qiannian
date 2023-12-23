const { addKnapsack } = require('../knapsackFn/addKnapsack');
const { computeRoleLevel } = require('../roleFn/computeRoleLevel');
const { computePetLevel } = require('../petFn/computePetLevel');

// 世界声望 world
// 帮会声望 gang
// 结义声望 intersect
// 世界功勋 exploit
// 经验 exp 
// 元宝 yuanbao 
// 银两 tael 
// 物品 article 
// 潜力 qian_li 

module.exports = {
    /**
     * 获取任务奖励
     * @param {*} req 
     * @param {*} res 
     * @param {*} reward 
     * @returns message 错误信息
     */
    getTaskReward: function (req, res, reward) {
        if (!reward) {
            return;
        }
        const { article, world, gang, intersect, exploit, exp = 0, yuanbao = 0, tael = 0 } = reward;

        if (article) {
            const message = addKnapsack(req, res, article);
            if (message) {
                return message
            }
        }
        if (tael || yuanbao) {
            const data = KnapsackG.getknapsackGlobal(req, res);
            KnapsackG.updateknapsackGlobal(req, res, { tael: data.tael + tael, yuanbao: data.yuanbao + yuanbao });
        }

        const integral = JSON.parse(JSON.stringify({
            world,
            gang,
            intersect,
            exploit,
        }))
        if (JSON.stringify(integral) !== '{}') {
            const { role_integral } = RoleG.getRoleGlobal(req, res);
            Object.keys(integral).forEach((key) => {
                role_integral[key] = role_integral[key] ? role_integral[key] + integral[key] : integral[key];
            })
            RoleG.updataRoleGlobal(req, res, { role_integral });
        }
        if (exp) {
            computeRoleLevel(req, res, exp);
            computePetLevel(req, res, exp);
        }
    }
}

