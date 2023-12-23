const { GRAND_Global } = require('./config');

// 怪物模版-> table-> ELEMENT_2.怪物模型
module.exports = {
    /**
     * 获取全局指令信息
     * @param {*} req 
     * @param {*} res 
     * @returns {*} name:地图名称
     * @returns {*} eleList:元素信息
     * @returns {*} eleDir:指令信息(完整元素信息)
     * @returns {*} moveDir:可移动指令
     * @returns {*} address:坐标
     * @returns {*} currentDir:当前指令信息,如战斗对手信息,任务信息等
     */
    getDirGlobal: function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        return GRAND_Global[role_id] || {}
    }

}