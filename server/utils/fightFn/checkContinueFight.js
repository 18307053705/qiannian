const { GrandG } = require("../../global");

module.exports = {
    /**
     * 判断是否可继续战斗
     * @param {*} req 
     * @param {*} res 
     * @returns {boolean}
     */
    checkContinueFight: (req, res) => {
        // 刷怪指令创建战斗
        // 需判断是否可继续刷怪
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { ext, boss, role_id } = currentDir;
        const { num } = ext;
        
        // 无法继续刷怪(次数不足,boss,玩家pk)
        if ((num !== undefined && num === 0) || boss || role_id) {
            return false;
        }
        return true;

    }
};