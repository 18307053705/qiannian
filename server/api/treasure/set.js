const { ErrorG, RoleG, DailysG, KnapsackG } = require('../../global');
const { EffectTable } = require('../../table');
const INTEGRAL_MEUN = {
    1: {
        treasureKey: 'fw',
        treasureName: '房屋',
        reputationKey: 'world',
        reputationName: '世界声望'
    },
    2: {
        treasureKey: 'xz',
        treasureName: '勋章',
        reputationKey: 'gang',
        reputationName: '帮会声望',
    },
    3: {
        treasureKey: 'lp',
        treasureName: '令牌',
        reputationKey: 'intersect',
        reputationName: '结义声望'
    },
    4: {
        treasureKey: 'hb',
        treasureName: '徽标',
        reputationKey: 'exploit',
        reputationName: '世界功勋'
    },
}

module.exports = {
    /**
     * 操作珍宝,普通，黑铁,青铜,白银,黄金,白金,钻石，王者,传说，神话
     * @param {*} req.type 珍宝类型(1:房屋,2:勋章,3:令牌,4:徽标)
     * @param {*} req.key 操作消耗(1:元宝,2:声望)
     */
    set: function (req, res) {
        const { type, key } = req.body;
        // 获取珍宝类型信息
        const treasureConfig = INTEGRAL_MEUN[type];
        if (![1, 2].includes(key) || !treasureConfig) {
            ErrorG.paramsError(res);
            return;
        }
        const { treasureKey, treasureName, reputationKey, reputationName } = treasureConfig;
        const { role_integral, treasure_pool, role_level } = RoleG.getRoleGlobal(req, res);

        const { exp } = treasure_pool[treasureKey];
        if (exp >= 10000000) {
            res.send({ code: 0, message: `${treasureName}已达最顶级。` });
            return;
        }
        if (role_level < 15) {
            res.send({ code: 0, message: `15级后可以开启${treasureName}功能,赶快去练级吧。。` });
            return;
        }
        if (role_level < 30) {
            res.send({ code: 0, message: `30级后可以开启${treasureName}功能,赶快去练级吧。。` });
            return;
        }
        const dailys = DailysG.getDailysGlobal(req, res);
        // 所有珍宝每日有十次免费操作
        if (dailys[treasureKey] > 0) {
            // 全局减少一次免费操作
            DailysG.updataDailysGlobal(req, res, { [treasureKey]: dailys[treasureKey] - 1 })
        } else {
            const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
            // 消耗元宝
            if (key === 1) {
                if (yuanbao < 25) {
                    res.send({ code: 0, message: '元宝不足25' });
                    return;
                }
                KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 25 });
            }
            // 消耗声望
            if (key === 2) {
                const integral = role_integral[reputationKey];
                if (integral < 50) {
                    res.send({ code: 0, message: `${reputationName}不足50` });
                    return;
                }
                role_integral[reputationKey] -= 50;
                RoleG.updataRoleGlobal(req, res, { role_integral });
            }
        }
        const { message } = EffectTable.group1Fn(req, res, `${treasureKey}-${Math.floor(Math.random() * (51 - 20)) + 20}`);
        res.send({
            code: 0,
            message
        })
    }
}
