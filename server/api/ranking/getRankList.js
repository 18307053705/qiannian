const { RoleSql, KnapsackSql, QingyuanSql } = require('@/mysql');
const { TianBangG } = require('@/global');
module.exports = {
    /**
     * 获取排名信息
     * @param type 排名类型
     * @param page 页数 1:等级，2:境界，3:生命，4:法力，5:攻击，6:防御，7:命中，8:闪避，9:暴击,100:姻缘树,101：财富
     */
    getRankList: async function (req, res) {
        const { type, page = 0, size = 2 } = req.body;
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101].includes(type)) {
            ErrorG.paramsError(res);
            return;
        }
        const { roles, iRole } = RoleG.getRoleAllGlobal(req, res);
        const { role_id } = iRole;
        const startIndex = page * size;
        const endIndex = startIndex + size;
        let oldList = [];
        // 姻缘树
        if (type === 100) {
            oldList = await QingyuanSql.asyncGetRegionQingYuan(req);
        } else if (type === 101) {
            // 财富
            oldList = await KnapsackSql.asyncGetRegionKnapsack(req);
            const { knapsacks } = KnapsackG.getknapsackAllGlobal(req, res);
            oldList = oldList.map((knapsack) => {
                const iKnapsack = knapsacks[knapsack.role_id];
                return iKnapsack ? iKnapsack : knapsack;
            })
        } else {
            oldList = await RoleSql.asyncGetRegionRole(req);
            oldList = oldList.map((role) => {
                const roleInfo = roles[role.user_id];
                return roleInfo ? roleInfo : role;
            })
        }
        const { rankList, list } = TianBangG.rankTypeChange(type, oldList, startIndex, endIndex);

        // 返回数据
        let frontName;
        const rankIndex = rankList.findIndex((role, index) => {
            if (role.role_id === role_id || role.role1 === role_id || role.role2 === role_id) {
                const rontRole = rankList[index - 1];
                if (rontRole) {
                    frontName = rontRole.role_name || rontRole.name || `${rontRole.name1}与${rontRole.name2}`;
                }

                return true;
            }
            return false;
        });
        res.send({
            code: 0,
            data: {
                list,
                total: rankList.length,
                role: {
                    rankIndex,
                    frontName
                }
            }
        })
    }
}