const { FightG, RoleG } = require("../../global");
module.exports = {
    /**
     * 胜利处理
     * @param {*} req 
     * @param {*} res
     * @param {*} fightMap 我的战斗信息
     * @param {*} rivalMap 对方战斗信息
     * @param {*} currentDir 我的战斗指令
     */
    victoryFight: function (req, res, fightMap, rivalMap, currentDir) {
        const { role_id, type, role_name } = currentDir;
        let myFightMap = undefined;
        // 对方生命值归零
        rivalMap.player.attr.life = 0;
        // 击杀战斗,更新真实信息
        if (type === 4) {
            // 更新自身
            RoleG.updataRoleGlobal(req, res, { life: fightMap.player.attr.life });
            myFightMap = FightG.updataFightMapGlobal(req, res, { steta: 1, text: `你成功击杀${role_name}！！`, })
            // 更新对方
            RoleG.updataRoleGlobal(req, res, { life: 0, address: '10000,0,0' }, { role_id });
            FightG.updataFightMapGlobal(req, res, {
                steta: 2,
                text: `你已经被${fightMap.player.name}击杀！！`,
                lose: ""
            }, role_id);
        }
        // 切磋不改变真实属性
        if (type === 3) {
            // 更新自身
            myFightMap = FightG.updataFightMapGlobal(req, res, { steta: 1, text: `你成功击败${role_name}！！`, })
            // 更新对方
            FightG.updataFightMapGlobal(req, res, {
                steta: 2,
                text: `你已经被${fightMap.player.name}击败！！`,
                lose: ""
            }, role_id);
        }

        res.send({
            code: 0,
            myFightMap: myFightMap,
        })
    }
};
