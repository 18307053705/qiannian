const { computeFightDps } = require('./computeFightDps');
const { FightG, RoleG } = require('../../global');
module.exports = {
    /**
     * 怪物普通攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} rivalAttr 怪物属性
     * @param {*} playerAttr 我的属性
     * @param {*} fightRound 回合信息
     * @returns {boolean} 存在返回,代表玩家已死亡
     */
    rivalNormalDir: function (req, res, rivalAttr, playerAttr, fightRound) {
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        let { players } = fightInfo;
        const { rivalMold, player, num } = fightMap;
        const { boss } = rivalMold.ext;
        let rise = 100;
        // boss有概率造成高倍伤害
        if (boss) {
            rise = 150;
            const rate = Math.floor(Math.random() * 100);
            if (rate > 50) {
                rise = 200;
            }
            if (rate > 70) {
                rise = 250;
            }
            if (rate > 90) {
                rise = 300;
            }
        }

        let { isHit, dps } = computeFightDps(req, res, rivalAttr, playerAttr, rise);
        dps *= num;
        fightRound.life -= dps;
        if (isHit && dps > 0) {
            player.attr.life -= dps;
            if (player.attr.life < 0) {
                player.attr.life = 0;
                fightMap.state = 2;
            }
            // 所在下标
            const index = players.findIndex(({ roleId }) => roleId === player.roleId);
            players[index] = {
                ...player
            }
        }
        const dataMap = FightG.updataFightMapGlobal(req, res, { player, state: fightMap.state });
        FightG.updataFightInfoGlobal(req, res, { players });
        // 战败
        if (fightMap.state === 2) {
            RoleG.updataRoleGlobal(req, res, { address: '10000,0,0' });
            res.send({
                code: 0,
                data: {
                    fightMap: dataMap
                }
            });
            return true;
        }
    },

};
