const { GrandG,  FightG } = require('../../global');

module.exports = {
    /**
     * 创建战斗指令
     * @param {string} role_id 角色id
     * @param {number} type 战斗类型3切磋,4击杀
     */
    createFightDir: async (req, res) => {
        const { role_id, type } = req.body;
        if (!(role_id && type)) {
            ErrorG.paramsError(res);
            return;
        }
        const { FIGHT_TYPE } = FightG;
        const tRoleInfo = RoleG.getRoleGlobal(req, res, { role_id });
        if (!tRoleInfo) {
            res.send({
                code: 0,
                message: `玩家未上线,无法进行${type === FIGHT_TYPE.duel ? "切磋" : "击杀"}`
            })
            return;
        }

        if (tRoleInfo.life <= 0) {
            res.send({
                code: 0,
                message: `${tRoleInfo.role_name}生命值为空。`
            })
            return;
        }

        const iRoleInfo = RoleG.getRoleGlobal(req, res)
        if (tRoleInfo.address !== iRoleInfo.address) {
            res.send({
                code: 0,
                message: `${tRoleInfo.role_name}与你不在一个地方,无法进行${type === FIGHT_TYPE.duel ? "切磋" : "击杀"}`
            })
            return;
        }
        if (iRoleInfo.life <= 0) {
            res.send({
                code: 0,
                message: `你的生命值为空,无法战斗。`
            })
            return;
        }

        const { fightMap } = FightG.getFightGlobal(req, res, role_id);
        if (fightMap) {
            res.send({
                code: 0,
                message: `${tRoleInfo.role_name}正在战斗中。`
            })
            return;
        }

        GrandG.setDirGlobal(req, res, { currentDir: { type, role_id, role_name: tRoleInfo.role_name } });
        res.send({
            code: 0,
            path: '/fight'
        })

    }
};