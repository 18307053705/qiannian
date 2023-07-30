const { GRAND_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 设置角色全局指令信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} dirInfo.name:地图名称
     * @param {*} dirInfo.eleList:元素信息
     * @param {*} dirInfo.eleDir:指令信息(完整元素信息)
     * @param {*} dirInfo.address:坐标
     * @param {*} dirInfo.currentDir:当前指令信息,如战斗对手信息,任务信息等
     */
    setDirGlobal: function (req, res, dirInfo) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        GRAND_Global[role_id] = dirInfo
    }

}