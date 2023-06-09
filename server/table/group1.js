const Global = require('../global')

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {key_value} group
     */
    groupFn: function (req, group, s = 1) {
        const [key, value] = group.split('-');
        if (!this[key]) {
            return { message: '特效异常' }
        }
        return this[key](req, value * s) || {};
    },
    fw: function (req, value) {
        const { treasure_pool, role_attr, role_level } = Global.getRoleGlobal(req);
        if (role_level < 50) {
            return { message: '房屋暂未开启。' };
        }
        const { fw } = treasure_pool;
        if (fw.exp >= 10000000) {
            return { message: '房屋已达最顶级。' };
        }
        let base = 1000;
        if (fw.exp !== 0) {
            base = 0;
        }
        let exp = value + fw.exp;
        exp = exp > 10000000 ? 10000000 : exp;
        // 增加的属性
        const add = parseInt(exp / 50) - parseInt(fw.exp / 50) + base;
        fw.exp = exp;
        role_attr.addition['life_max'] += add;
        role_attr.addition['mana_max'] += add;
        Global.updateRoleGlobal(req, { treasure_pool, role_attr });
        // return { success: '房屋已达最顶级。' };
    },
    xz: function (req, value) {
        const { treasure_pool, role_attr, role_level } = Global.getRoleGlobal(req);
        const { xz } = treasure_pool;
        if (role_level < 50) {
            return { message: '房屋暂未开启。' };
        }
        if (xz.exp >= 10000000) {
            return { message: '勋章已达最顶级。' };
        }
        let baseAtkMax = 100;
        let baseAtkMin = 75;
        let basehit = 10;
        if (xz.exp !== 0) {
            baseAtkMax = 0;
            baseAtkMin = 0;
            basehit = 0;
        }
        let exp = value + xz.exp;
        exp = exp > 10000000 ? 10000000 : exp;
        // 增加的属性
        const atk_max = parseInt(exp / 500) - parseInt(xz.exp / 500) + baseAtkMax;
        const atk_min = parseInt(exp / 1000) - parseInt(xz.exp / 1000) + baseAtkMin;
        const hit = parseInt(exp / 5000) - parseInt(xz.exp / 5000) + basehit;
        xz.exp = exp;
        role_attr.addition['atk_max'] += atk_max;
        role_attr.addition['atk_min'] += atk_min;
        role_attr.addition['hit'] += hit;
        Global.updateRoleGlobal(req, { treasure_pool, role_attr });
    },
    lp: function (req, value) {
        const { treasure_pool, role_attr, role_level } = Global.getRoleGlobal(req);
        const { lp } = treasure_pool;
        if (role_level < 50) {
            return { message: '房屋暂未开启。' };
        }
        if (lp.exp >= 10000000) {
            return { message: '令牌已达最顶级。' };
        }
        let baseDfsMax = 100;
        let baseDfsMin = 75;
        let baseDodge = 10;
        if (lp.exp !== 0) {
            baseDfsMax = 0;
            baseDfsMin = 0;
            baseDodge = 0;
        }
        let exp = value + lp.exp;
        exp = exp > 10000000 ? 10000000 : exp;
        // 增加的属性
        const dfs_max = parseInt(exp / 500) - parseInt(lp.exp / 500) + baseDfsMax;
        const dfs_min = parseInt(exp / 1000) - parseInt(lp.exp / 1000) + baseDfsMin;
        const dodge = parseInt(exp / 5000) - parseInt(lp.exp / 5000) + baseDodge;
        lp.exp = exp;
        role_attr.addition['dfs_max'] += dfs_max;
        role_attr.addition['dfs_min'] += dfs_min;
        role_attr.addition['dodge'] += dodge;
        Global.updateRoleGlobal(req, { treasure_pool, role_attr });
    },
    hb: function (req, value) {
        const { treasure_pool, role_attr, role_level } = Global.getRoleGlobal(req);
        const { hb } = treasure_pool;
        if (role_level < 50) {
            return { message: '房屋暂未开启。' };
        }
        if (hb.exp >= 10000000) {
            return { message: '徽标已达最顶级。' };
        }
        let base = 10;
        if (hb.exp !== 0) {
            base = 0;
            baseDfsMin = 0;
            baseDodge = 0;
        }
        let exp = value + hb.exp;
        exp = exp > 10000000 ? 10000000 : exp;
        // 增加的属性
        const add = parseInt(exp / 5000) - parseInt(hb.exp / 5000) + base;
        hb.exp = exp;
        role_attr.addition['hit'] += add;
        role_attr.addition['dodge'] += add;
        role_attr.addition['sudden'] += add;
        Global.updateRoleGlobal(req, { treasure_pool, role_attr });
    },
    life: function (req, value) {
        const { life } = Global.getRoleGlobal(req);
        Global.updateRoleGlobal(req, { life: life + value });
    },
    mana: function (req, value) {
        const { mana } = Global.getRoleGlobal(req);
        Global.updateRoleGlobal(req, { mana: mana + value });
    },
    world: function (req, value) {
        const { role_integral } = Global.getRoleGlobal(req);
        const { world = 0 } = role_integral;
        role_integral['world'] = world + value;
        Global.updateRoleGlobal(req, { role_integral });
    },
    gang: function (req, value) {
        const { role_integral } = Global.getRoleGlobal(req);
        const { gang = 0 } = role_integral;
        role_integral['gang'] = gang + value;
        Global.updateRoleGlobal(req, { role_integral });
    },
    intersect: function (req, value) {
        const { role_integral } = Global.getRoleGlobal(req);
        const { intersect = 0 } = role_integral;
        role_integral['intersect'] = intersect + value;
        Global.updateRoleGlobal(req, { role_integral });
    },
    exploit: function (req, value) {
        const { role_integral } = Global.getRoleGlobal(req);
        const { exploit = 0 } = role_integral;
        role_integral['exploit'] = exploit + value;
        Global.updateRoleGlobal(req, { role_integral });
    },
    fame: function (req, value) {
        const { role_integral } = Global.getRoleGlobal(req);
        const { fame = 0 } = role_integral;
        role_integral['fame'] = fame + value;
        Global.updateRoleGlobal(req, { role_integral });
    },
    yuanbao: function (req, value) {
        const { yuanbao } = Global.getknapsackGlobal(req);
        Global.updateknapsackGlobal(req, { yuanbao: yuanbao + value });
    },
    tael: function (req, value) {
        const { tael } = Global.getknapsackGlobal(req);
        Global.updateknapsackGlobal(req, { tael: tael + value });
    },
    lx: function (req, value) {
        const { role_lx } = Global.getRoleGlobal(req);
        Global.updateRoleGlobal(req, { role_lx: role_lx + value });
    },
}

