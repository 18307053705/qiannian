const { getRoleGlobal } = require('@/global/roleG/getRoleGlobal');
const { computeUpExp } = require('@/utils/roleFn/computeUpExp');
const { computeRoleLevel } = require('@/utils/roleFn/computeRoleLevel');

const groups = {
    /**
     * 经验丹
     */
    jingYanDan: function (req, res, group, s, name) {
        const { role_level } = getRoleGlobal(req, res);
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
    renShenGuo: function (req, res, group, s, name) {
        const { role_level } = getRoleGlobal(req, res);
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
    maoErDuo: function (req, res, group, s, name) {
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
    xiSuiDan: function (req, res, group, s) {

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
        return groups[group](req, res, group, s, name);
    },
}

