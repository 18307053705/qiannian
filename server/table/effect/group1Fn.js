const { getRoleGlobal } = require('../../global/roleG/getRoleGlobal');
const { updataRoleGlobal } = require('../../global/roleG/updataRoleGlobal');

module.exports = {
    /**
     * 直接增加玩家属性的物品
     * @param {*} req 
     * @param {*} res 
     * @param {} group key-value
     * @param {number} s 使用数量
     * @returns { string } message 错误信息,存在则使用失败
     * @returns { string } text 使用成功信息,存在则使用成功
     */
    group1Fn: function (req, res, group, s = 1) {
        const [key, value] = group.split('-');
        return module.exports[key](req, res, value * s);
    },
    fw: function (req, res, value) {
        const { treasure_pool, role_attr, role_level } = getRoleGlobal(req, res);
        if (role_level < 15) {
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
        updataRoleGlobal(req, res, { treasure_pool, role_attr });
        return {
            text: `房屋清洁+${value}`
        }
    },
    xz: function (req, res, value) {
        const { treasure_pool, role_attr, role_level } = getRoleGlobal(req, res);
        const { xz } = treasure_pool;
        if (role_level < 30) {
            return { message: '勋章暂未开启。' };
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
        updataRoleGlobal(req, res, { treasure_pool, role_attr });
        return { text: `勋章荣誉+${value}` }
    },
    lp: function (req, res, value) {
        const { treasure_pool, role_attr, role_level } = getRoleGlobal(req, res);
        const { lp } = treasure_pool;
        if (role_level < 30) {
            return { message: '令牌暂未开启。' };
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
        updataRoleGlobal(req, res, { treasure_pool, role_attr });
        return { text: `令牌忠义+${value}` };
    },
    hb: function (req, res, value) {
        const { treasure_pool, role_attr, role_level } = getRoleGlobal(req, res);
        const { hb } = treasure_pool;
        if (role_level < 30) {
            return { message: '徽标暂未开启。' };
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
        updataRoleGlobal(req, res, { treasure_pool, role_attr });
        return { text: `徽标名望+${value}` };
    },
    life: function (req, res, value) {
        const { life } = getRoleGlobal(req, res);
        updataRoleGlobal(req, res, { life: life + value });
        return { text: `生命+${value}` };
    },
    mana: function (req, res, value) {
        const { mana } = getRoleGlobal(req, res);
        updataRoleGlobal(req, res, { mana: mana + value });
        return { text: `法力+${value}` };
    },
    world: function (req, res, value) {
        const { role_integral } = getRoleGlobal(req, res);
        const { world = 0 } = role_integral;
        role_integral['world'] = world + value;
        updataRoleGlobal(req, res, { role_integral });
        return { text: `世界声望+${value}` };
    },
    gang: function (req, res, value) {
        const { role_integral } = getRoleGlobal(req, res);
        const { gang = 0 } = role_integral;
        role_integral['gang'] = gang + value;
        updataRoleGlobal(req, res, { role_integral });
        return { text: `帮会声望+${value}` };
    },
    intersect: function (req, res, value) {
        const { role_integral } = getRoleGlobal(req, res);
        const { intersect = 0 } = role_integral;
        role_integral['intersect'] = intersect + value;
        updataRoleGlobal(req, res, { role_integral });
        return { text: `结义声望+${value}` };
    },
    exploit: function (req, res, value) {
        const { role_integral } = getRoleGlobal(req, res);
        const { exploit = 0 } = role_integral;
        role_integral['exploit'] = exploit + value;
        updataRoleGlobal(req, res, { role_integral });
        return { text: `世界功勋+${value}` };
    },
    fame: function (req, res, value) {
        const { role_integral } = getRoleGlobal(req, res);
        const { fame = 0 } = role_integral;
        role_integral['fame'] = fame + value;
        updataRoleGlobal(req, res, { role_integral });
        return { text: `世界名气+${value}` };
    },
    yuanbao: function (req, res, value) {
        const { yuanbao } = Global.getknapsackGlobal(req);
        Global.updateknapsackGlobal(req, { yuanbao: yuanbao + value });
        return { text: `元宝+${value}` };
    },
    tael: function (req, res, value) {
        const { tael } = Global.getknapsackGlobal(req);
        Global.updateknapsackGlobal(req, { tael: tael + value });
        return { text: `银两+${value}` };
    },
    lx: function (req, res, value) {
        const { role_lx } = getRoleGlobal(req, res);
        updataRoleGlobal(req, res, { role_lx: role_lx + value });
        return { text: `灵血+${value}` };
    },
}

