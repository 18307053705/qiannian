const { FightG, GrandG } = require('@/global');
const { knapsackTable, ElementTable } = require('@/table');
const { addKnapsack } = require('@/utils/knapsackFn/addKnapsack');
const { computeRoleLevel } = require('@/utils/roleFn/computeRoleLevel');
const { computePetLevel } = require('@/utils/petFn/computePetLevel');
const { listenTask } = require('@/utils/taskFn/listenTask');


module.exports = {
    /**
     * 获取战斗奖励
     * @param  req 
     * @param  res
     */
    getFreakReward: function (req, res) {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const roleInfo = RoleG.getRoleGlobal(req, res);
        const knapsack = KnapsackG.getknapsackGlobal(req, res);
        const { template, player, roundText } = fightInfo;
        // 判断是否为深渊怪,是则使用指令中的信息
        const freak = currentDir.shenyuan ? currentDir : ElementTable.getElement(template.id);
        const { article, exp: f_exp, tael: f_tael, level, grade } = freak;

        // -----------------计算物品奖励--------------------
        const textReward = [];
        const artReward = {}; // 物品奖励
        if (article) {
            article.split(',').map(reward => {
                // 掉落概率默认100
                const [articleId, s = 1, rate = 100] = reward.split('-');
                // 获取物品
                if (rate > Math.floor(Math.random() * 100)) {
                    const { name, id } = knapsackTable.getArticle(articleId);
                    artReward[id] = { name, id, s: Number(s) };
                    textReward.push(`获得[${name}]x${s}`);
                }
            })
        }
        const tip = addKnapsack(req, res, artReward, { data: knapsack.data });

        // -----------------计算经验银两--------------------
        // 获取人物buff
        const { role_buff } = roleInfo;
        const { vip = {} } = role_buff;
        const freakNum = template.num;
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
        // 经验
        let exp = f_exp;
        if (exp === undefined) {
            exp = Math.floor((level * (grade === 3 ? 1000 : (grade === 2 ? 50 : 1))) * (vipExp || 1) * freakNum);
        }
        // 银两
        let tael = f_tael;
        if (tael === undefined) {
            tael = Math.floor((exp < 100 ? exp : exp / 100) * (vipTael || 1) * freakNum);
        }

        // 更新背包
        KnapsackG.updateknapsackGlobal(req, res, { tael: knapsack.tael + tael });
        // 更新角色经验等级s
        computeRoleLevel(req, res, exp, (islevel, updata) => {
            // 判断角色是否升级
            if (islevel) {
                player.attr['life'] = updata.life;
                player.attr['mana'] = updata.mana;
                FightG.updataFightInfoGlobal(req, res, { player })
            }
        });
        // 监听任务池
        const tasks = listenTask(req, res, template.id, freakNum);
        const expText = vipExp && !exps ? `${exp}(${vipExp}倍经验)` : exp;
        const reward = {
            textReward: tip ? [] : textReward,
            tip: tip,
            tasks: tasks,
            exp: expText,
            tael: vipTael && !taels ? `${tael}(${vipTael}倍银两)` : tael,
            pet: roundText.resultPet,
            petExp: player.pet ? `${player.pet.name}经验：${expText}` : '',
        }
        // 更新宠物经验等级
        computePetLevel(req, res, exp, (islevel, update, name) => {
            if (islevel) {
                reward['petLevel'] = `${name}升到${update.level}级。`;
            }
        })
        FightG.updataFightInfoGlobal(req, res, { reward, continue: currentDir.num === -1 || currentDir.num > 0 });
    },

};