const { TIAN_BANG_Global } = require('./config');
const { rankTypeChange } = require('./rankTypeChange');
const { RoleSql, KnapsackSql, QingyuanSql } = require('@/mysql');
module.exports = {
    /**
     * 计算排名信息
     */
    computeRank: async function () {
        const req = { cookies: {} };
        const { roles } = RoleG.getRoleAllGlobal(req);
        const { knapsacks } = KnapsackG.getknapsackAllGlobal(req);
        let qingyuanList = await QingyuanSql.asyncGetRegionQingYuan(req);
        let knapsackList = await KnapsackSql.asyncGetRegionKnapsack(req);
        let roleList = await RoleSql.asyncGetRegionRole(req);
        const startIndex = 0;
        const endIndex = 10;
        // 背包额外处理
        knapsackList = knapsackList.map((knapsack) => {
            const iKnapsack = knapsacks[knapsack.role_id];
            return iKnapsack ? iKnapsack : knapsack;
        })
        // 角色额外处理
        roleList = roleList.map((role) => {
            const roleInfo = roles[role.user_id];
            return roleInfo ? roleInfo : role;
        })

        const { list: levelList } = rankTypeChange(1, roleList, startIndex, endIndex);
        const { list: realmList } = rankTypeChange(2, roleList, startIndex, endIndex);
        const { list: lifeList } = rankTypeChange(3, roleList, startIndex, endIndex);
        const { list: manaList } = rankTypeChange(4, roleList, startIndex, endIndex);
        const { list: atkList } = rankTypeChange(5, roleList, startIndex, endIndex);
        const { list: dfsList } = rankTypeChange(6, roleList, startIndex, endIndex);
        const { list: hitList } = rankTypeChange(7, roleList, startIndex, endIndex);
        const { list: dodgeList } = rankTypeChange(8, roleList, startIndex, endIndex);
        const { list: suddenList } = rankTypeChange(9, roleList, startIndex, endIndex);
        const { list: yinYuanList } = rankTypeChange(100, qingyuanList, startIndex, endIndex);
        const { list: taelList } = rankTypeChange(101, knapsackList, startIndex, endIndex);
        // 开启领取
        TIAN_BANG_Global.open = true;
        TIAN_BANG_Global[1] = levelList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[2] = realmList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[3] = lifeList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[4] = manaList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[5] = atkList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[6] = dfsList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[7] = hitList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[8] = dodgeList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[9] = suddenList.map(({ role_id }) => ({ id: role_id }));
        TIAN_BANG_Global[100] = yinYuanList.map(({ id }) => ({ id, ok: [] }));
        TIAN_BANG_Global[101] = taelList.map(({ role_id }) => ({ id: role_id }));

        setTimeout(() => {
            // 关闭领取
            TIAN_BANG_Global.open = false;
        }, 86400000);
    }


}