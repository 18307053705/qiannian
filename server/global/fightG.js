module.exports = {
    fightRoleId: {
        // 角色id 存在战斗池id role_id:1 对应fightMap[id]
    },
    fightMap: {
        // 战斗池信息 {id,type,rival,player,contact }
        // id: 战斗池信息id
        // type 战斗类型: 1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
        // rival 对方信息 [] 
        // player 我方信息[] {}
        // buffs buff信息
        // extDir 敌人原型信息
    },
    setFight: function (req, data) {
        const { role_id } = this.getRoleGlobal(req);
        const fightId = this.fightRoleId[role_id];
        if (fightId) {
            this.fightMap[fightId] = data;
        }
    },
    getFight: function (req) {
        const { role_id } = this.getRoleGlobal(req);
        const fightId = this.fightRoleId[role_id];
        if (fightId) {
            return JSON.parse(JSON.stringify(this.fightMap[fightId]))
        }
        return undefined;
    },
    updataFight: function (req, data) {
        const { role_id } = this.getRoleGlobal(req);
        const fightId = this.fightRoleId[role_id];
        this.fightMap[fightId] = {
            ...this.fightMap[fightId],
            ...data,
        }
    }

};

