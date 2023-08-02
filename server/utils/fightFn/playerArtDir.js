const { FightG } = require('../../global');
const { AttributeTable } = require('../../table');
const { playerNormalDir } = require('./playerNormalDir');
const { getRoleArtInfo } = require('../artFn/getRoleArtInfo');
module.exports = {
    /**
     * 技能攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} playerAttr 攻击方属性
     * @param {*} rivalAttr 防御属性
     * @param {*} fightRound 回合信息
     * @param {*} artId 技能id
     */
    playerArtDir: function (req, res, playerAttr, rivalAttr, fightRound, artId) {

        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { p, d, v, n, t = 1 } = getRoleArtInfo(req, res, artId);
        // 非单攻,群攻,buff技能
        if (![1, 2, 3].includes(p)) {
            return;
        }
        const { attr, name, roleId } = fightMap.player;
        if (attr.mana < d) {
            return '法力不足！'
        } else {
            attr.mana -= d;
            fightRound.mana -= d;
        }
        // 单攻,群攻
        if (p === 1 || p === 2) {
            playerNormalDir(req, res, playerAttr, rivalAttr, fightRound, v, t);
        }
        // buff技能
        if (p === 3) {
            const AttrTextMeun = AttributeTable.getAttrMeun();
            let { players, buffs } = fightInfo;
            // 保存buffID
            const buffId = `${roleId}_${artId}`;
            // 若存在此buff,直接增加回合,无需重新计算属性
            if (buffs[buffId]) {
                buffs[buffId]['t'] = t;
            } else {
                // buff描述
                const textList = [];
                // buff增加的属性
                const values = {};
                Object.keys(v).forEach(key => {
                    const val = v[key];
                    textList.push(`${AttrTextMeun[key]}上限+${val}`);
                    if (key === 'life' || key === 'mana') {
                        values[`${key}_max`] = val;
                        values[key] = val;
                    }
                    if (key === 'hit' || key === 'dodge' || key === "sudden") {
                        values[key] = val;
                        return;
                    }
                    values[`${key}_max`] = val;
                    values[`${key}_min`] = val;
                })
                Object.keys(values).forEach((key) => {
                    attr[key] += values[key];
                    players = players.map((itme) => {

                        itme.attr[key] += values[key];
                        return itme;
                    })
                })
                buffs[buffId] = {
                    t,
                    text: `${name}(${n}):${textList.join(',')}`,
                    values,
                }
            }
            // 更新战斗池信息
            FightG.updataFightInfoGlobal(req, res, { players, buffs });
        }

        FightG.updataFightMapGlobal(req, res, { player: fightMap.player });
    },

};
