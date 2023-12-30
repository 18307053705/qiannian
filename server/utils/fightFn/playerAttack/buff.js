const { FightG } = require('../../../global');
const { AttributeTable } = require('../../../table');
const { getRoleArtInfo } = require('../../artFn/getRoleArtInfo');

function getBuffInfo(effect, t, n, name, buff) {
    if (buff) {
        buff['t'] = t;
        return buff;
    }
    const AttrTextMeun = AttributeTable.getAttrMeun();
    // buff描述
    const textList = [];
    // buff增加的属性
    const values = {};
    const effectList = effect.split(',');
    effectList.forEach(e => {
        const [key, vals] = e.split('-');
        const val = Number(vals);
        textList.push(`${AttrTextMeun[key]}上限+${val}`);
        if (key === 'life' || key === 'mana') {
            values[`${key}_max`] = val;
            values[key] = val;
            return;
        }
        if (key === 'hit' || key === 'dodge' || key === "sudden") {
            values[key] = val;
            return;
        }
        values[`${key}_max`] = val;
        values[`${key}_min`] = val;
    })
    return {
        t,
        text: `${name}(${n}):${textList.join(',')}`,
        values,
        role: []
    }
}


module.exports = {
    /**
     * buff信息
     * @param req 
     * @param res 
     * @param artId 法术ID
     */
    buff: function (req, res, artId) {
        const { FIGHT_TYPE_EUNM } = FightG;
        const { v, n, t = 1 } = getRoleArtInfo(req, res, artId);
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { player, type } = fightMap;
        const { role_id, name } = player;
        const buffId = `${role_id}_${artId}`;
        // 组队 buffs 保存在战斗信息池
        if (type === FIGHT_TYPE_EUNM.rank) {
            const { buffs } = fightInfo;
            buffs[buffId] = getBuffInfo(v, t, n, name, buffs[buffId]);
            FightG.updataFightInfoGlobal(req, res, { buffs });
            return;
        } else {
            // 单人 保存在战斗map池
            const { buffs } = fightMap;
            buffs[buffId] = getBuffInfo(v, t, n, name, buffs[buffId]);
            FightG.updataFightMapGlobal(req, res, { buffs });
        }

    },

};
