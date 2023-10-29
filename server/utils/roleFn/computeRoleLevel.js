const { RoleG } = require("../../global");
const { AttributeTable, RealmTable } = require("../../table");
const { computeUpExp } = require("./computeUpExp");
const { computeRoleAttr } = require("./computeRoleAttr");
module.exports = {
    /**
     * 计算人物等级
     * @param {*} req 
     * @param {*} res 
     * @param {*} exp 增加的经验
     * @param {*} callback 回调函数(isLevel:是否升级,updata:需要更新的对象)=>{}
     * @returns {*} roleInfo |undefined
     * 
     */
    computeRoleLevel: function (req, res, exp, callback) {
        const roleInfo = RoleG.getRoleGlobal(req, res);
        let { role_level, role_exp, role_realm, role_career, role_attr } = roleInfo;
        let [oldExp, upExp] = role_exp.split('/');
        let current = Number(oldExp) + exp;
        let base = undefined;
        // 当前经验大于升级经验,处理升级逻辑
        if (current >= upExp && role_level < 100) {
            current -= upExp;
            // 角色升级
            role_level++;
            // 获取境界对应属性增幅
            const { attr } = RealmTable.getRealm(role_realm)
            // 根据职业选择升级属性加成
            base = AttributeTable.getRoleBaseAttr(role_career);
            // 计算新的属性
            Object.keys(base).forEach(key => {
                base[key] *= attr * role_level;
            })
            // 计算下级所需经验
            upExp = computeUpExp(role_level);
            res.customSuccess = `恭喜玩家升到${role_level}级。`
        }
        const update = {
            role_exp: `${current}/${upExp}`,
            role_level
        }
      
        if (base) {
            role_attr.base = base;
            update['role_attr'] = role_attr;
            // 计算最新属性,升级后恢复满状态
            const { attr } = computeRoleAttr(req, res, roleInfo, { life_max: 0, mana_max: 0 });
            update['life'] = attr.life_max;
            update['mana'] = attr.mana_max;
        }
        callback && callback(Boolean(base), update)
        return RoleG.updataRoleGlobal(req, res, update);

    }
};
