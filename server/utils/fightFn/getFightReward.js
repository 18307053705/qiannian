const { RoleG, KnapsackG, FightG } = require('../../global');
const knapsackFn = require('../../utils/knapsackFn');
module.exports = {
    /**
     * 获取战斗奖励
     * @param {*} req 
     * @param {*} res
     * @returns {*} data.results 怪物奖励信息
     * @returns {*} data.tasks 任务描述信息
     */
    getFightReward: function (req, res) {
        const roleInfo = RoleG.getRoleGlobal(req, res);
        const knapsack = KnapsackG.getknapsackGlobal(req, res);
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { rivalMold, num: freakNum } = fightMap;
        const { article = [], ext } = rivalMold;
        const textReward = [];
        const artReward = {}; // 物品奖励
        const equipReward = {}; // 装备奖励
        // 获取物品概率
        const rate = Math.floor(Math.random() * (100 - 0)) + 0;
        article.forEach((itme) => {
            if (!itme.rate || itme.rate > rate) {
                // 根据类型保存
                itme.type == 3 ? equipReward[itme.id] = itme : artReward[itme.id] = itme;
                textReward.push(`获得[${itme.name || itme.n}]x${itme.s || itme.num || 1}`)
            }
        });
        const tip = knapsackFn.addKnapsack(req, res, { article: { artReward, equipReward, data: knapsack.data } });
        // 获取人物buff
        const { role_buff } = roleInfo;
        const { vip = {} } = role_buff;
        let vipExp = 0;
        if (vip['exp2']) {
            vipExp += 2
        }
        if (vip['exp3']) {
            vipExp += 3
        }
        if (vip['exp5']) {
            vipExp += 5
        }
        let vipTael = 0;
        if (vip['money2']) {
            vipTael += 2
        }
        if (vip['money3']) {
            vipTael += 3
        }
        if (vip['money5']) {
            vipTael += 5
        }
        // 物品可叠加
        const { level, arrt, boss, exps = 0, taels = 0 } = ext;
        // 经验
        const exp = (exps || level * (parseInt(arrt / 10) || 1) * (boss ? 1000 : 1)) * (vipExp || 1);
        // 银两
        const tael = (taels || exp < 100 ? exp : exp / 100) * (vipTael || 1);
        // 更新背包
        KnapsackG.updateknapsackGlobal(req, res, { tael: knapsack.tael - 0 + tael * freakNum });
        // 更新角色经验等级
        // roleFn.computeRoleLevel(req, res, exp * freakNum);
        // 监听任务池
        // const tasks = taskFn.listenTask(req, freak.extDir['id'], freakNum);
        // return
        const results = {
            textReward: tip ? '' : textReward,
            exp: vipExp ? `${exp * freakNum}(${vipExp}倍经验)` : exp * freakNum,
            tael: vipTael ? `${tael * freakNum}(${vipTael}倍银两)` : tael * freakNum,
            tip: tip,
        }
        return {
            results,
            tasks: []
        }
    },

};
