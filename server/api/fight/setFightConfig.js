const { FightG, RoleG, KnapsackG } = require('../../global');
const { knapsackFn } = require('../../utils');

module.exports = {
    /**
     * 设置战斗配置
     * @param {*} req.body.dir_type 指令类型 1技能 2 物品 
     * @param {*} req.body.dir_inx 更换的指令下标
     * @param {*} req.body.dir_id 替换的指令id
     */
    setFightConfig: async (req, res) => {
        const { dir_id, dir_type, dir_inx } = req.body;
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { skill_pool } = RoleG.getRoleGlobal(req, res);
        const { art, fight } = skill_pool;
        // 对应指令列表
        let list = [];
        if (dir_type === 1) {
            Object.keys(art).forEach((key) => {
                const { n, id, p, l } = art[key]
                // 1:单攻 2:群攻 3:buff 且已领悟
                if ([1, 2, 3].includes(p) && l !== -1) {
                    list.push({ n, id, })
                }
            })
        }
        if (dir_type === 2) {
            // 获取替换前的物品信息
            const { num, id, p, n } = fight[dir_inx] = {};
            const article = {};
            // 消耗过该物品，则进行背包更新
            if (num) {
                article[id] = {
                    p,
                    s: num,
                    n
                }
            }
            const { data } = knapsackFn.deleteKnapsack(req, res, { article });
            list = data
        }
        const itme = list.find(({ id }) => dir_id == id);
        // 设置技能键未更改情况,不做处理返回之前战斗设置
        if (itme && (fight[dir_inx] === null || fight[dir_inx].id !== dir_id)) {
            fight[dir_inx] = {
                ...itme,
                dir_type,
            };
            const { player } = Global.getFight(req);
            player.forEach((itme) => {
                if (itme.id === role_id) {
                    itme.art = fight
                }
            })
            const result = Global.updateRoleGlobal(req, { skill_pool });
            Global.updataFight(req, { player })
            res.send({
                code: result ? 0 : 100003,
                data: result ? fight.map((itme) => (itme ? { id: itme.id, name: itme.n, s: itme.s } : { id: 0, name: '普通攻击' })) : '更新失败'
            })
            return;

            res.send({
                code: 0,
                data: {
                    drug,
                    art,
                    config: fightMap.player.art
                }
            });
        }
    }