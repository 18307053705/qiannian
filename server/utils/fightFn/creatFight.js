const { FightG, GrandG } = require("../../global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");


module.exports = {
    /**
     * 创建战斗
     * @param {*} req 
     * @param {*} res 
     * @param {*} type 战斗类型,默认1 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
     * @returns {*} Promise address 返回坐标
     */
    creatFight: function (req, res, type = 1) {
        const { fightInfo, figthId } = FightG.getFightGlobal(req, res);
        // 存在战斗,直接返回战斗信息
        if (figthId) {
            return fightInfo;
        }

        // 不存在则创建战斗
        const { currentDir } = GrandG.getDirGlobal(req, res);
        // 创建怪物属性
        const rival = creatFreak(req, res, currentDir);
        // 创建玩家属性
        const player = creatPlayer(req, res);

        const fight = {
            type,
            rival,
            player: [player],
            info: {
                statu: 0, // 战斗状态
                num: rival.length, // 怪物数量
                continue: !currentDir.boss // 是否可继续
            },
            freakMole: currentDir // 怪物原型，战斗结束时,获取奖励等信息
        }
        FightG.setFightGlobal(req, res, fight)
    },

};
