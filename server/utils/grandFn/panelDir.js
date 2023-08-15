const { RoleG, FightG } = require("../../global");
const fightFn = require("../fightFn");

module.exports = {
    /**
     * 指令打开的面板信息
     * @param {*} req 
     * @param {*} res
     * @param {*} dirInfo 地图指令
     * @returns {*} path 面板路径
     * @returns {*} address 坐标
     */
    panelDir: function (req, res, dirInfo) {
        const { address } = RoleG.getRoleGlobal(req, res);
        const { type } = dirInfo;
        let path = '';
        // 怪物元素，进入战斗界面
        if (type === 2) {
            return {
                path: '/fight',
                address
            };
        }
        return {
            path: path || dirInfo.path,
            address
        };
    },

};
