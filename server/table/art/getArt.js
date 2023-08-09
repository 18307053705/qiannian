const artList = require('./artList');
module.exports = {
    /**
     * 获取技能详情
     * @param {*} artId
     * @returns art.id 技能id
     * @returns art.p 技能类型(1:单攻 2:群攻 3:buff 4:天赋 5:宠物天赋)
     * @returns art.n 技能名称
     * @returns art.v 威力值 (被动与buff技能格式为属性增幅:atk-10)
     * @returns art.d 法力消耗
     * @returns art.t 攻击目标数量(bufff技能代表回合)
     * @returns art.up 等级加成
     * @returns art.rp 转数加成
     * @returns art.condition 学习条件
     * @returns art.effect 技能特效(四转可激活)
     * @returns art.msg 描述
     */
    getArt: function (artId) {
        const art = artList[artId];
        return art ? JSON.parse(JSON.stringify(art)) : undefined;
    }
}