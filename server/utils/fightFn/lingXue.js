const { RoleG, FightG } = require('../../global');
module.exports = {
    /**
     * 灵血补充
     * @param {*} req 
     * @param {*} res
     * @param {*} fightRound 回合信息
     */
    lingXue: function (req, res, fightRound) {
        let { role_lx} = RoleG.getRoleGlobal(req, res);
        if (role_lx <= 0) {
            return;
        }
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { player } = fightMap;
        let { players } = fightInfo;
        const { life, life_max, mana_max, mana } = player.attr;
        // 生命值低于可触发灵血
        if (life_max / 2 > life) {
            // 需要灵血值
            const addLife = life_max - life;
            // 判断灵血是否充足
            if (role_lx >= addLife) {
                role_lx -= addLife;
                player.attr['life'] = life_max;
                fightRound.life += addLife;
            } else {
                player.attr['life'] += role_lx;
                fightRound.life += role_lx;
            }
        }
        // 法力值低于可触发灵血
        if (mana_max / 2 > mana) {
            // 需要灵血值
            const addmana = mana_max - mana;
            // 判断灵血是否充足
            if (role_lx >= addmana) {
                role_lx -= addmana;
                player.attr['mana'] = mana_max;
                fightRound.mana += addmana;
            } else {
                player.attr['mana'] += role_lx;
                fightRound.mana += role_lx;
            }
        }
        const index = players.findIndex(({ roleId }) => roleId === player.roleId);
        players[index] = player;
        FightG.updataFightMapGlobal(req, res, { player });
        FightG.updataFightInfoGlobal(req, res, { players });
    },

};
