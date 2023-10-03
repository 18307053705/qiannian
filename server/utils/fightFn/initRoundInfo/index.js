const { FightG } = require('../../../global');
const { initRoundAttr } = require('./initRoundAttr');
const { computeBuffs } = require('./computeBuffs');
module.exports = {
    /**
     * 初始化回合信息
     * @param {*} req 
     * @param {*} res
     */
    initRoundInfo: function (req, res) {
        // 回合文案
        const roundText = {
            dps: '',
            pet_dps: undefined,
            drain_life: undefined,
            drain_mana: undefined,
            restore_life: undefined,
            restore_mana: undefined
        }
        // 计算buff
        computeBuffs(req,res);
        // 回合属性
        const roundAttr = initRoundAttr(req, res);
        // 更新回合信息
        FightG.updataFightMapGlobal(req, res, { roundText, roundAttr });
    },

};
