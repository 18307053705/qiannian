const { FightG } = require('../../global');
const { AttributeTable } = require('../../table');
const { playerNormalDir } = require('./playerNormalDir');
const { getRoleArtInfo } = require('../artFn/getRoleArtInfo');
module.exports = {
    /**
     * 技能攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightRound 回合信息
     * @param {*} artId 技能id
     */
    playerArtDir: function (req, res, fightRound, artId) {

        const { fightMap } = FightG.getFightGlobal(req, res);
        const { p, d, v, n, t = 1 } = getRoleArtInfo(req, res, artId);
        // 非单攻,群攻,buff技能
        if (![1, 2, 3].includes(p)) {
            return;
        }
        const { attr, name, roleId, buffs } = fightMap.player;
        if (attr.mana < d) {
            fightRound.message = '法力不足！';
            return;
        } else {
            attr.mana -= d;
            fightRound.mana -= d;
        }
        // 单攻,群攻
        if (p === 1 || p === 2) {
            return playerNormalDir(req, res, fightRound, v, t);
        }
        // buff技能
        if (p === 3) {
            const AttrTextMeun = AttributeTable.getAttrMeun();
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
                })
                buffs[buffId] = {
                    t,
                    text: `${name}(${n}):${textList.join(',')}`,
                    values,
                }
            }
        }
        FightG.updataFightMapGlobal(req, res, { player: fightMap.player });
    },

};
