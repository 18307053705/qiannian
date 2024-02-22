const { AttrSystem } = require('@/system');
module.exports = {
    /**
     * 排名类型处理
     * @param {*} type 
     * @param {*} rankList 
     * @param {*} startIndex 
     * @param {*} endIndex 
     * @returns 
     */
    rankTypeChange: function (type, rankList, startIndex, endIndex) {
        if (type === 1) {
            rankList = rankList.sort((a, b) => {
                if (a.role_level === b.role_level) {
                    const aExp = a.role_exp.split('/')[0];
                    const bExp = b.role_exp.split('/')[0];
                    return bExp - aExp;
                }
                return b.role_level - a.role_level;
            })

            list = rankList.slice(startIndex, endIndex).map(({ role_level, role_name, role_race, role_id }, index) => (
                {
                    level: role_level,
                    name: role_name,
                    career: role_race,
                    rank: startIndex + index,
                    role_id
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

            list = rankList.slice(startIndex, endIndex).map(({ role_realm, role_name, role_id }, index) => (
                {
                    realm: role_realm,
                    name: role_name,
                    rank: startIndex + index,
                    role_id
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
            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    life: attr.life_max,
                    name: role_name,
                    rank: startIndex + index,
                    role_id
                }));
        }

        // 法力排名
        if (type === 4) {
            rankList = rankList.sort((a, b) => {
                return b.attr.mana_max - a.attr.mana_max;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    mana: attr.mana_max,
                    name: role_name,
                    role_id,
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

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    atk_max: attr.atk_max,
                    atk_min: attr.atk_min,
                    role_id,
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

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    dfs_max: attr.dfs_max,
                    dfs_min: attr.dfs_min,
                    role_id,
                    name: role_name,
                    rank: startIndex + index
                }));
        }

        // 命中排名
        if (type === 7) {
            rankList = rankList.sort((a, b) => {
                return b.attr.hit - a.attr.hit;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    hit: attr.hit,
                    name: role_name,
                    role_id,
                    rank: startIndex + index
                }));
        }

        // 闪避排名
        if (type === 8) {
            rankList = rankList.sort((a, b) => {
                return b.attr.dodge - a.attr.dodge;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    dodge: attr.dodge,
                    name: role_name,
                    role_id,
                    rank: startIndex + index
                }));
        }
        // 暴击排名
        if (type === 9) {
            rankList = rankList.sort((a, b) => {
                return b.attr.sudden - a.attr.sudden;
            })

            list = rankList.slice(startIndex, endIndex).map(({ attr, role_name, role_id }, index) => (
                {
                    sudden: attr.sudden,
                    name: role_name,
                    role_id,
                    rank: startIndex + index
                }));
        }


        // 姻缘树排名
        if (type === 100) {
            rankList = rankList.sort((a, b) => {
                if (a.level === b.level) {
                    const aExp = a.exp.split('/')[0];
                    const bExp = b.exp.split('/')[0];
                    return bExp - aExp;
                }
                return b.level - a.level;
            })
            list = rankList.slice(startIndex, endIndex).map(({ level, name1, name2, id }, index) => (
                {
                    level,
                    name: `${name1}与${name2}`,
                    rank: startIndex + index,
                    id
                }));
        }

        // 财富排名
        if (type === 101) {
            rankList = rankList.sort((a, b) => {
                return b.tael - a.tael;
            })

            list = rankList.slice(startIndex, endIndex).map(({ tael, name, role_id }, index) => (
                {
                    tael,
                    name,
                    rank: startIndex + index,
                    role_id
                }));
        }

        return {
            rankList,
            list
        }
    }


}