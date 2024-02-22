const { RoleSql, KnapsackSql, QingyuanSql } = require('@/mysql');
const { AttrSystem } = require('@/system');
module.exports = {
    /**
     * 获取排名信息
     * @param type 排名类型
     * @param page 页数 1:等级，2:境界，3:生命，4:法力，5:攻击，6:防御，7:命中，8:闪避，9:暴击,100:姻缘树,101：财富
     */
    getRankList: async function (req, res) {
        const { type, page = 1, size = 20 } = req.body;
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101].includes(type)) {
            ErrorG.paramsError(res);
            return;
        }
        const { roles, iRole } = RoleG.getRoleAllGlobal(req, res);
        const { role_id } = iRole;
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size + 1;
        let rankList = [];
        let list = [];
        if (![100, 101].includes(type)) {
            rankList = await RoleSql.asyncGetRegionRole(req);
            rankList = rankList.map((role) => {
                const roleInfo = roles[role.user_id];
                return roleInfo ? roleInfo : role;
            })
        };
        // 等级排名
        if (type === 1) {
            rankList = rankList.sort((a, b) => {
                if (a.role_level === b.role_level) {
                    const aExp = a.role_exp.split('/')[0];
                    const bExp = b.role_exp.split('/')[0];
                    return bExp - aExp;
                }
                return b.role_level - a.role_level;
            })

            list = rankList.slice(startIndex, endIndex).map(({ role_level, role_name, role_race }, index) => (
                {
                    level: role_level,
                    name: role_name,
                    career: role_race,
                    rank: startIndex + index
                }));
        }

        // 境界排名
        if (type === 2) {
            rankList = rankList.sort((a, b) => {
                if (a.role_realm === b.role_realm) {
                    const aExp = a.role_exp.split('/')[0];
                    const bExp = b.role_exp.split('/')[0];
                    return bExp - aExp;
                }
                return b.role_realm - a.role_realm;
            })

            list = rankList.slice(startIndex, endIndex).map(({ role_realm, role_name }, index) => (
                {
                    realm: role_realm,
                    name: role_name,
                    rank: startIndex + index
                }));
        }

        // 属性排名统一计算属性
        if ([3, 4, 5, 6, 7, 8, 9].includes(type)) {
            rankList = rankList.map((role) => {
                const { attr } = AttrSystem.computeRoleAttr(role);
                role.attr = attr;
                return role;
            })
        }
        // 生命排名
        if (type === 3) {
            rankList = rankList.sort((a, b) => {
                return b.attr.life_max - a.attr.life_max;
            })
            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    life: attr.life_max,
                    name: role_name,
                    rank: startIndex + index
                }));
        }

        // 法力排名
        if (type === 4) {
            rankList = rankList.sort((a, b) => {
                return b.attr.mana_max - a.attr.mana_max;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    mana: attr.mana_max,
                    name: role_name,
                    rank: startIndex + index
                }));
        }
        // 攻击排名
        if (type === 5) {
            rankList = rankList.sort((a, b) => {
                const bAtk = b.attr.atk_max + b.attr.atk_min;
                const aAtk = a.attr.atk_max + a.attr.atk_min;
                return bAtk - aAtk;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    atk_max: attr.atk_max,
                    atk_min: attr.atk_min,
                    name: role_name,
                    rank: startIndex + index
                }));
        }
        // 防御排名
        if (type === 6) {
            rankList = rankList.sort((a, b) => {
                const bDfs = b.attr.dfs_max + b.attr.dfs_min;
                const aDfs = a.attr.dfs_max + a.attr.dfs_min;
                return bDfs - aDfs;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    dfs_max: attr.dfs_max,
                    dfs_min: attr.dfs_min,
                    name: role_name,
                    rank: startIndex + index
                }));
        }

        // 命中排名
        if (type === 7) {
            rankList = rankList.sort((a, b) => {
                return b.attr.hit - a.attr.hit;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    hit: attr.hit,
                    name: role_name,
                    rank: startIndex + index
                }));
        }

        // 闪避排名
        if (type === 8) {
            rankList = rankList.sort((a, b) => {
                return b.attr.dodge - a.attr.dodge;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    dodge: attr.dodge,
                    name: role_name,
                    rank: startIndex + index
                }));
        }
        // 暴击排名
        if (type === 9) {
            rankList = rankList.sort((a, b) => {
                return b.attr.sudden - a.attr.sudden;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name }, index) => (
                {
                    sudden: attr.sudden,
                    name: role_name,
                    rank: startIndex + index
                }));
        }


        // 姻缘树排名
        if (type === 100) {
            rankList = await QingyuanSql.asyncGetRegionQingYuan(req);
            rankList = rankList.sort((a, b) => {
                if (a.level === b.level) {
                    const aExp = a.exp.split('/')[0];
                    const bExp = b.exp.split('/')[0];
                    return bExp - aExp;
                }
                return b.level - a.level;
            })
            list = rankList.slice(startIndex, endIndex).map(({ level, name1, name2 }, index) => (
                {
                    level,
                    name: `${name1}与${name2}`,
                    rank: startIndex + index
                }));
        }

        // 财富排名
        if (type === 101) {
            rankList = await KnapsackSql.asyncGetRegionKnapsack(req);
            const { knapsacks } = KnapsackG.getknapsackAllGlobal(req, res);
            rankList = rankList.map((knapsack) => {
                const iKnapsack = knapsacks[knapsack.role_id];
                return iKnapsack ? iKnapsack : knapsack;
            })

            rankList = rankList.sort((a, b) => {
                return b.tael - a.tael;
            })

            list = rankList.slice(startIndex, endIndex).map(({ tael, name }, index) => (
                {
                    tael,
                    name,
                    rank: startIndex + index
                }));
        }

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
                role: {
                    rankIndex,
                    frontName
                }
            },
            rankList,
            roles,
        })
    }
}