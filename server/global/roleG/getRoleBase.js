const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 获取角色全局信息
     * @param {*} req 
     * @param {*} res 
     * @returns {*} role | undefined
     * @returns {*} user_id:账号
     * @returns {*} role_id:角色id
     * @returns {*} role_name:角色名称
     * @returns {*} role_race:种族(1人2妖3仙)
     * @returns {*} role_career:职业(1法皇2战尊3羽圣4血煞5战狂6赤魅7星君8战神9剑仙)
     * @returns {*} role_sex:性别(男,女)
     * @returns {*} role_level:角色等级
     * @returns {*} address:位置
     */
    getRoleBase: function (req) {
        const user = req.cookies["q_uid"];
        const role = ROLE_Global[user];
        return role ? {
            role_name: role.role_name,
            role_race: role.role_race,
            role_career: role.role_career,
            role_sex: role.role_sex,
            role_level: role.role_level,
            address: role.address,
        } : undefined;
    }

}