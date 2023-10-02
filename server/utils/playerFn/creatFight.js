const { FightG, GrandG, RoleG } = require("../../global");
const { creatPlayer } = require("./creatPlayer");

/**
 * 创建对手信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} currentDir 战斗指令
 */
function creatRivalFightMap(req, res, currentDir) {
    const { role_id, type } = currentDir;
    const { fightMap } = FightG.getFightGlobal(req, res, role_id);
    if (!fightMap || fightMap.state !== 0) {
        const { role_id: i_roleId, role_name } = RoleG.getRoleGlobal(req, res);
        // 创建对方属性,
        const player = creatPlayer(req, res, type, role_id);
        const rivalFightMaps = {
            type,
            rivalMold: {
                // 保存我方id到对方战斗信息中
                role_id: i_roleId,
                role_name,
                type,
            },
            isContinue: false,
            player,
            rivalId: i_roleId
        }
        FightG.setFightGlobal(req, res, rivalFightMaps, {}, role_id);
        // 保存我方id到对方战斗指令
        GrandG.setDirGlobal(req, res, { currentDir: { type, role_id: i_roleId, role_name } }, { roleId: role_id });
    }
}

module.exports = {
    /**
     * 创建战斗
     * @param {*} req 
     * @param {*} res 
     */
    creatFight: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        // 战斗中,直接返回战斗信息
        if (fightMap) {
            return;
        }
        // 不存在则创建战斗
        const { currentDir } = GrandG.getDirGlobal(req, res);

        // 对方的角色id,是否死斗
        const { role_id, type } = currentDir;
        const player = creatPlayer(req, res, type);
        // 创建化全局战斗
        const fightMaps = {
            type,
            rivalMold: currentDir,
            isContinue: false,
            player,
            rivalId: role_id
        }
        // 创建我的全局战斗信息
        FightG.setFightGlobal(req, res, fightMaps, {});
        // 创建对手全局战斗信息
        creatRivalFightMap(req, res, currentDir);

    },

};
