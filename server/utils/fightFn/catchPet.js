const { FightG, RoleG } = require('../../global');
const { ElementTable } = require('../../table');
const { setPet } = require('../petFn/setPet');
const { FIGHT_TYPE } = FightG;
module.exports = {
    /**
     * 捕捉宠物
     * @param {*} req 
     * @param {*} res 
     */
    catchPet: function (req, res) {
        const { pet_pool, role_level } = RoleG.getRoleGlobal(req, res);
        if (pet_pool['l'].length >= pet_pool['x']) {
            return '宠物房已满,无法获得更多宠物。';
        }
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText, type, template } = fightMap;
        const { id, name, num } = template;
        const { pet, level } = ElementTable.getElement(id) || {};
        // 非人机不可捕捉
        if (FIGHT_TYPE.pve !== type || !pet) {
            roundText.message = '目标不可被捕捉。';
            FightG.updataFightMapGlobal(req, res, { roundText });
            return;
        }
        if (role_level + 10 < level) {
            roundText.message = '低于目标10级,无法捕捉。';
            FightG.updataFightMapGlobal(req, res, { roundText });
            return;
        }
        // 计算概率
        const rate = Math.floor(Math.random() * 101) + (role_level - level) - (num * 10);
        if (rate < 60) {
            roundText.message = '捕捉失败。';
            FightG.updataFightMapGlobal(req, res, { roundText });
            return;
        }
        roundText.resultPet = `捕捉宠物[${name}]`;
        roundAttr.rival.list = roundAttr.rival.list.map((attr) => {
            attr.life = 0;
            return attr;
        })
        FightG.updataFightMapGlobal(req, res, { roundAttr, roundText });
        setPet(req, res, { name, flair_x: level });
    },

};
