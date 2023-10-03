const { RoleG, FightG } = require('../../global');
module.exports = {
    /**
     * 灵血补充
     * @param {*} req 
     * @param {*} res
     */
    lingXue: function (req, res) {
        const { FIGHT_TYPE } = FightG;
        let { role_lx } = RoleG.getRoleGlobal(req, res);
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { player, type, roundText } = fightMap;
        // 玩家对战 或者 灵血不足不可使用灵血
        if (FIGHT_TYPE.kill === type || FIGHT_TYPE.duel === type || role_lx <= 0) {
            return;
        }
        const { life, life_max, mana_max, mana } = player.attr;
        // 生命值低于35%可触发灵血
        if (life_max * 0.35 > life) {
            // 需要灵血值
            const addLife = life_max - life;
            // 判断灵血是否充足
            if (role_lx >= addLife) {
                role_lx -= addLife;
                player.attr['life'] = life_max;
                roundText.restore_life = roundText.restore_life ? roundText.restore_life + addLife : addLife;
            } else {
                player.attr['life'] += role_lx;
                roundText.restore_life = roundText.restore_life ? roundText.restore_life + role_lx : role_lx;
            }
        }
        // 法力值低于35%可触发灵血
        if (mana_max * 0.35 > mana) {
            // 需要灵血值
            const addmana = mana_max - mana;
            // 判断灵血是否充足
            if (role_lx >= addmana) {
                role_lx -= addmana;
                player.attr['mana'] = mana_max;
                roundText.restore_mana = roundText.restore_mana ? roundText.restore_mana + addmana : addmana;
            } else {
                player.attr['mana'] += role_lx;
                roundText.restore_mana = roundText.restore_mana ? roundText.restore_mana + role_lx : role_lx;
            }
        }
        FightG.updataFightMapGlobal(req, res, { player, roundText });
        RoleG.updataRoleGlobal(req, res, { role_lx });
    },

};
