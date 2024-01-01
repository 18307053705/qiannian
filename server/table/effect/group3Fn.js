const { computeUpExp } = require('@/utils/roleFn/computeUpExp');
const { computeRoleLevel } = require('@/utils/roleFn/computeRoleLevel');
const { addKnapsack } = require('@/utils/knapsackFn/addKnapsack');

const groups = {
    /**
     * 经验丹
     */
    jingYanDan: function (req, res, s, name) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        let num = s;
        let exps = 0;
        while (num) {
            num--;
            let exp = 100000;
            if (role_level < 30) {
                exp = computeUpExp(role_level);
            }
            exps += exp;
            computeRoleLevel(req, res, exp);
        }
        return { success: `使用${s}枚${name},获得经验${exps}` };
    },
    /**
     * 人参果
     */
    renShenGuo: function (req, res, s, name) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        let num = s;
        let exps = 0;
        while (num) {
            num--;
            let exp = 10000000;
            if (role_level < 50) {
                exp = computeUpExp(role_level);
            }
            exps += exp;
            computeRoleLevel(req, res, exp)
        }
        return { success: `使用${s}枚${name},获得经验${exps}` };
    },
    /**
     * 猫耳果
     */
    maoErDuo: function (req, res, s, name) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        let num = s;
        let exps = 0;
        while (num) {
            num--;
            let exp = 100000000;
            if (role_level < 70) {
                exp = computeUpExp(role_level);
            }
            exps += exp;
            computeRoleLevel(req, res, exp)
        }
        return { success: `使用${s}枚${name},获得经验${exps}` };
    },
    /**
     * 洗髓丹
     */
    xiSuiDan: function (req, res, s) {

    },
    /**
     * 新手大礼包
     */
    gift1630: function (req, res) {
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael + 100000, yuanbao: yuanbao + 1000 });
        const article = {
            100: {
                s: 100,
                name: '一品凝血散',
            },
            101: {
                s: 100,
                name: '一品聚气散',
            },
            1631: {
                s: 1,
                name: '10级新手大礼包',
            },
            131: {
                s: 1,
                name: '新手木剑',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            132: {
                s: 1,
                name: '新手头巾',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            133: {
                s: 1,
                name: '新手布衣',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            134: {
                s: 1,
                name: '新手腰带',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            135: {
                s: 1,
                name: '新手草鞋',
                ext: '0_10_0_0_0_0_0_0_0'
            },
        }
        addKnapsack(req, res, article, { force: true });
        res.listText = [
            '元宝+1000',
            '银两+100000',
            '一品凝血散+100',
            '一品聚气散+100',
            '[精良]新手木剑+1',
            '[精良]新手头巾+1',
            '[精良]新手布衣+1',
            '[精良]新手腰带+1',
            '[精良]新手草鞋+1',
            '10级新手大礼包+1',
        ]
        return { active: true };
    },
    /**
     * 10级新手大礼包
     */
    gift1631: function (req, res) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        if (role_level < 10) {
            return { active: false, message: '等级不足10级' }
        }
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael + 10000, yuanbao: yuanbao + 100 });
        const article = {
            102: {
                s: 100,
                name: '二品凝血散',
            },
            103: {
                s: 100,
                name: '二品聚气散',
            },
            1632: {
                s: 1,
                name: '30级新手大礼包',
            },
            136: {
                s: 1,
                name: '紫金剑',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            137: {
                s: 1,
                name: '紫金盔',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            138: {
                s: 1,
                name: '紫金甲',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            139: {
                s: 1,
                name: '紫金带',
                ext: '0_10_0_0_0_0_0_0_0'
            },
            1310: {
                s: 1,
                name: '紫金靴',
                ext: '0_10_0_0_0_0_0_0_0'
            },
        }
        addKnapsack(req, res, article, { force: true });
        res.listText = [
            '元宝+100',
            '银两+10000',
            '二品凝血散+100',
            '二品聚气散+100',
            '[精良]紫金剑+1',
            '[精良]紫金盔+1',
            '[精良]紫金甲+1',
            '[精良]紫金带+1',
            '[精良]紫金靴+1',
            '30级新手大礼包+1',
        ]
        return { active: true };
    },
    /**
     * 30级新手大礼包
     */
    gift1632: function (req, res) {
        const { role_career, role_level } = RoleG.getRoleGlobal(req, res);
        if (role_level < 30) {
            return { active: false, message: '等级不足30级' }
        }
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael + 50000, yuanbao: yuanbao + 300 });
        // 35级声望武器信息
        let equipInfo = {
            1326: {
                s: 1,
                name: '星辰法杖',
            },
        };
        if ([2, 4, 7].includes(role_career)) {
            equipInfo = {
                1331: {
                    s: 1,
                    name: '玉尊战戟',
                }
            };
        }
        if ([3, 6, 9].includes(role_career)) {
            equipInfo = {
                1336: {
                    s: 1,
                    name: '凌影长剑',
                }
            };
        }
        const article = {
            104: {
                s: 200,
                name: '三品凝血散',
            },
            105: {
                s: 200,
                name: '三品聚气散',
            },
            1633: {
                s: 1,
                name: '50级新手大礼包',
            },
            120: {
                s: 10,
                name: '世界声望卷',
            },
            121: {
                s: 10,
                name: '帮会声望卷轴',
            },
            122: {
                s: 10,
                name: '结义声望卷轴',
            },
            ...equipInfo
        }
        addKnapsack(req, res, article, { force: true });
        res.listText = [
            '元宝+300',
            '银两+50000',
            '三品凝血散+200',
            '三品聚气散+200',
            '世界声望卷+10',
            '帮会声望卷轴+10',
            '结义声望卷轴+10',
            '50级新手大礼包+1',
            `[普通]${equipInfo[1326]?.name || equipInfo[1331]?.name || equipInfo[1336]?.name}+1`,
        ]
        return { active: true };
    },
    /**
     * 50级新手大礼包
     */
    gift1633: function (req, res) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        if (role_level < 50) {
            return { active: false, message: '等级不足50级' }
        }
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael + 500000, yuanbao: yuanbao + 1000 });
        const article = {
            106: {
                s: 500,
                name: '四品凝血散',
            },
            107: {
                s: 500,
                name: '四品聚气散',
            },
            120: {
                s: 30,
                name: '世界声望卷',
            },
            121: {
                s: 30,
                name: '帮会声望卷轴',
            },
            122: {
                s: 30,
                name: '结义声望卷轴',
            },
            123: {
                s: 10,
                name: '世界功勋卷轴',
            }
        }
        addKnapsack(req, res, article, { force: true });
        res.listText = [
            '元宝+1000',
            '银两+500000',
            '四品凝血散+500',
            '四品聚气散+500',
            '世界声望卷+30',
            '帮会声望卷轴+30',
            '结义声望卷轴+30',
            '世界功勋卷轴+10',
        ]
        return { active: true };
    },
}



module.exports = {
    /**
     * 定制物品
     * @param {*} req 
     * @param {*} res 
     * @param {key_value} group
     * @param {number} s 使用数量
     * @returns { string } message 错误信息
     * @returns { string } success 成功信息
     * @returns { string } data 背包信息
     */
    group3Fn: function (req, res, name, group, s = 1) {
        return groups[group](req, res, s, name);
    },
}

