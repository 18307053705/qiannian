
const { RoleG } = require('../../global');
module.exports = {
    /**
     * 获取角色技能信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} artId 技能id
     * @retunrs art.id 技能id
     * @retunrs art.p 技能类型(1:单攻 2:群攻 3:buff 4:天赋 5:宠物天赋)
     * @retunrs art.n 技能名称
     * @retunrs art.v 技能威力具体值 || {atk: 100, sudden: 20} 
     * @retunrs art.d 技能消耗
     * @retunrs art.t 技能目标数量||回合数
     * @retunrs art.l 技能等级 -1未领悟
     * @retunrs art.r 技能转数
     * @retunrs art.e 技能特效
     */
    getRoleArtInfo: function (req, res, artId) {
        const { skill_pool } = RoleG.getRoleGlobal(req, res);
        const { art } = skill_pool;
        return art[artId];
    },

};
