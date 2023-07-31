const { FightG, GrandG } = require("../../global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");


module.exports = {
    /**
     * 创建战斗
     * @param {*} req 
     * @param {*} res 
     * @param {*} type 战斗类型,默认1 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
     * @returns {*} fightMap 战斗信息
     * @returns {*} fightInfo 战斗具体信息
     */
    creatFight: function (req, res, type = 1) {
        const { fightInfo, fightMap } = FightG.getFightGlobal(req, res);
        // 战斗中,直接返回战斗信息
        if (fightMap && fightMap.state === 0) {
            return {
                fightInfo,
                fightMap
            };
        }

        // 不存在则创建战斗
        const { currentDir } = GrandG.getDirGlobal(req, res);

        // 创建怪物属性
        const rivals = creatFreak(req, res, currentDir);
        // 创建玩家属性
        const player = creatPlayer(req, res);
        // 创建化全局战斗
        const fightMaps = {
            type: 1,
            rivalMold: currentDir,
            num: rivals.length,
            isContinue: !currentDir.boss,
            player
        }
        const fightInfos = {
            rivals,
            players: [player],
            buffs: {}
        }
        return FightG.setFightGlobal(req, res, fightMaps, fightInfos);
    },

};
