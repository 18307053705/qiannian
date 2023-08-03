const { FightG, GrandG, SocializeG } = require("../../global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} currentDir 
 * @returns {boolean} true组队中，无需创建战斗
 */
function isCreateFight(req, res, currentDir) {
    const { role_id,add } = currentDir;
    const { line = {} } = SocializeG.getSocializeGlobal(req, res, 'ranks');
    let fight = undefined;
    // 查找是否有队友与自己在击杀相同的组队怪物，未找到方可创建
    Object.keys(line).forEach((roleId) => {
        const { fightMap, fightInfo } = FightG.getFightGlobal(res, req, roleId);
        if (fightMap && fightMap.state === 0 && fightMap.rivalId === id) {
            fight = {
                fightInfo,
                fightMap
            }
        }
    })

    if (fight) {
        // 创建玩家属性
        const player = creatPlayer(req, res);
        // 创建化全局战斗
        const fightMaps = {
            ...fight.fightMap,
            player,
        }
        fight.fightInfo.players.push(player);
        return FightG.setFightGlobal(req, res, fightMaps, fight.fightInfo);
    }
}

module.exports = {
    /**
     * 创建战斗
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.type 战斗类型,默认1 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
     * @param {boolean} data.continueDir 创建战斗
     * @returns {Promise} fightMap 战斗信息
     * @returns {Promise} rivalFightMap 对方战斗信息
     */
    creatFight: async function (req, res, role_id) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { rivalMold } = fightMap;
        const { fightMap: rivalFightMap } = FightG.getFightGlobal(req, res, rivalMold.role_id || role_id);
        // 战斗中,直接返回战斗信息
        if (fightMap) {
            return {
                fightMap,
                rivalFightMap
            };
        }
        // 不存在则创建战斗
        const { currentDir } = GrandG.getDirGlobal(req, res);
        // 对方的角色id,是否死斗
        const { role_id, type } = currentDir;
        const player = creatPlayer(req, res, type);

    
        // 创建怪物属性
        const rivals = creatFreak(req, res, currentDir);
        // 创建玩家属性
        const player = creatPlayer(req, res);
        // 创建化全局战斗
        const fightMaps = {
            type: isRanks ? 3 : 1,
            rivalMold: currentDir,
            num: rivals.length,
            isContinue: !currentDir.boss,
            player,
            rivalId: currentDir.id
        }
        const fightInfos = {
            rivals,
            players: [player],
            buffs: {}
        }
        return FightG.setFightGlobal(req, res, fightMaps, fightInfos);
    },

};
