const { RoleG, KnapsackG, FightG } = require('../../global');
const { knapsackTable } = require('../../table');
const knapsackFn = require('../../utils/knapsackFn');
const roleFn = require('../../utils/roleFn');
const { listenTask } = require('../../utils/taskFn/listenTask');

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
        const { rivalMold, num: freakNum, player } = fightMap;
        const { equip, article, ext } = rivalMold;
        const equipList = equip ? equip.split(',').map(str => {
            const [id, rate = 100] = str.split('-');
            return {
                id: id - 0,
                rate
            }
        }) : [];
        const articleList = article ? article.split(',').map(str => {
            const [id, s = 1, rate = 100] = str.split('-');
            return {
                id: id - 0,
                s: s - 0,
                rate
            }
        }) : [];
        const textReward = [];
        const artReward = {}; // 物品奖励
        const equipReward = {}; // 装备奖励
        // 物品id,s物品数量默认1 rate概率默认100
        equipList.forEach(({ id, rate }) => {
            // 获取物品
            if (rate > Math.floor(Math.random() * (100 - 0))) {
                const { type, name } = knapsackTable.getEquip(id);
                equipReward[id] = { type, n: name, id, s: 1 };
                textReward.push(`获得[${name}]x1`)
            }
        });
        // 物品id,s物品数量默认1 rate概率默认100
        articleList.forEach(({ id, s, rate }) => {
            // 获取物品
            if (rate > Math.floor(Math.random() * (100 - 0))) {
                const article = knapsackTable.getArticle(id);
                if (article) {
                    const { type, n } = article;
                    artReward[id] = { type, n, id, s };
                    textReward.push(`获得[${n}]x${s}`)
                }

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
        const { level, arrt, boss, exps, taels } = ext;
        // 经验
        let exp = exps;
        if (exp === undefined) {
            exp = (level * (parseInt(arrt / 10) || 1) * (boss ? 1000 : 1)) * (vipExp || 1) * freakNum;
        }
        // 银两
        let tael = taels;
        if (tael === undefined) {
            tael = (exp < 100 ? exp : exp / 100) * (vipTael || 1) * freakNum;
        }
        // 更新背包
        KnapsackG.updateknapsackGlobal(req, res, { tael: knapsack.tael + tael });
        // 更新角色经验等级
        roleFn.computeRoleLevel(req, res, exp, (islevel, updata) => {
            // 判断角色是否升级
            if (islevel) {
                player.attr['life'] = updata.life;
                player.attr['mana'] = updata.mana;
                FightG.updataFightMapGlobal(req, res, { player })
            }
        });
        // 监听任务池
        const tasks = listenTask(req, res, rivalMold['id'], freakNum);
        const reward = {
            textReward: tip ? [] : textReward,
            tip: tip,
            tasks: tasks

        }
        if (exp !== undefined) {
            reward['exp'] = vipExp && !exps ? `${exp}(${vipExp}倍经验)` : exp;
        }
        if (tael !== undefined) {
            reward['tael'] = vipTael && !taels ? `${tael}(${vipTael}倍银两)` : tael;
        }
        return reward;
    },

};
