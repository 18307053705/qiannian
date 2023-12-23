const { computeUpExp } = require('@/utils/roleFn/computeUpExp');
const { computeRoleLevel } = require('@/utils/roleFn/computeRoleLevel');
const { addKnapsack } = require('@/utils/knapsackFn/addKnapsack');
// const { computeRoleLevel } = require('@/global');

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
        return { success: '获得元宝+1000,银两+100000,一品凝血散+100,一品聚气散+100,[精良]新手木剑+1,[精良]新手头巾+1,[精良]新手布衣+1,[精良]新手腰带+1,[精良]新手草鞋+1,10级新手大礼包+1' };
    }
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

